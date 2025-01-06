// pixelUtils.js
// export const isTrackingReady = () => {
//   return typeof window !== 'undefined' && typeof window.fbq === 'function' && typeof window.ttq?.track === 'function' && Array.isArray(window.dataLayer) && typeof window.analytics?.track === 'function';
// };

export const isTrackingReady = () => {
  const trackingStatus = {
    facebook: typeof window.fbq === 'function',
    // tiktok: typeof window.ttq?.track === 'function',
    // gtm: Array.isArray(window.dataLayer),
    segment: typeof window.analytics?.track === 'function',
  };

  console.log('Tracking Status:', {
    facebook: trackingStatus.facebook ? '✅ Ready' : '❌ Not Ready',
    // tiktok: trackingStatus.tiktok ? '✅ Ready' : '❌ Not Ready',
    // gtm: trackingStatus.gtm ? '✅ Ready' : '❌ Not Ready',
    // segment: trackingStatus.segment ? '✅ Ready' : '❌ Not Ready',
  });

  return Object.values(trackingStatus).every((status) => status === true);
};

export const trackPixelEvents = (eventConfig) => {
  console.log(eventConfig, 'ini event pixels');
  const { eventName = 'initiate_checkout', eventData = {}, dynamicTagPixels } = eventConfig;

  console.log(window, 'ini window nya');

  if (typeof window === 'undefined') return;

  const defaultEventData = {
    content_type: 'product',
    currency: 'IDR',
    ...eventData,
  };

  const attemptTracking = (attempts = 0) => {
    if (attempts > 10) {
      console.error('Tracking failed after maximum attempts');
      return;
    }

    const canTrackFacebook = typeof window.fbq === 'function';
    const canTrackTikTok = typeof window.ttq?.track === 'function';
    const canTrackGTM = Array.isArray(window.dataLayer);
    const canTrackSegment = typeof window.analytics?.track === 'function';

    if (!canTrackFacebook) {
      setTimeout(() => attemptTracking(attempts + 1), 1000);
      return;
    }

    try {
      if (canTrackFacebook) {
        window.fbq('track', eventName, defaultEventData);
        console.log('Facebook tracking successful');
      }
      if (canTrackTikTok) {
        window.ttq.track(eventName, defaultEventData);
        console.log('TikTok tracking successful');
      }
      if (canTrackGTM) {
        window.dataLayer.push({
          event: eventName,
          ...defaultEventData,
        });
        console.log('GTM tracking successful');
      }
      if (canTrackSegment) {
        window.analytics.track(eventName, defaultEventData);
        console.log('Segment tracking successful');
      }
    } catch (error) {
      console.error('Tracking error:', error);
    }
  };

  attemptTracking();
};

export function addFacebookPixel(pixelId) {
  if (!pixelId) {
    console.error('Facebook Pixel ID is missing');
    return;
  }

  try {
    const script = document.createElement('script');
    script.textContent = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Add noscript fallback
    const noScript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
    noScript.appendChild(img);
    document.body.appendChild(noScript);

    console.log('Facebook Pixel initialized successfully');
  } catch (error) {
    console.error('Error initializing Facebook Pixel:', error);
  }
}

export function addTikTokPixel(pixelId) {
  if (!pixelId) {
    console.error('TikTok Pixel ID is missing');
    return;
  }

  try {
    const script = document.createElement('script');
    script.textContent = `
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
        ttq.methods=["page","track","identify","instances","debug","on","off","setIdentity"];
        ttq.setIdentity=ttq.setIdentity||function(){};
        ttq.instance=function(t){var e=ttq;
        ttq.instance=function(t){
          e=t;
        };void 0!==t?ttq.instance(t):[t]};
        ttq.queue=[];t=d.createElement('script');
        t.src='https://analytics.tiktok.com/i18n/pixel/events.js';
        t.async=!0;d.head.appendChild(t)
      }(window, document, 'ttq');
      ttq.load('${pixelId}');
      ttq.page();
    `;
    document.head.appendChild(script);
    console.log('TikTok Pixel initialized successfully');
  } catch (error) {
    console.error('Error initializing TikTok Pixel:', error);
  }
}

export function addGoogleTagManager(gtmId) {
  if (!gtmId) {
    console.error('GTM ID is missing');
    return;
  }

  try {
    const dataLayer = document.createElement('script');
    dataLayer.textContent = `window.dataLayer = window.dataLayer || [];`;
    document.head.appendChild(dataLayer);

    const gTagScript = document.createElement('script');
    gTagScript.textContent = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(gTagScript);
    console.log('GTM initialized successfully');
  } catch (error) {
    console.error('Error initializing GTM:', error);
  }
}
