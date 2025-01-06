
export const trackPixelEvents = (eventConfig) => {
  console.log(eventConfig, 'ini event config');
  const { eventName = 'initiate_checkout', eventData = {}, dynamicTagPixels } = eventConfig;

  const defaultEventData = {
    content_type: 'product',
    currency: 'IDR',
    ...eventData,
  };

  // Check if window and tracking methods exist
  const canTrack = typeof window !== 'undefined';

  if (canTrack) {
    // Facebook Pixel Tracking
    if (window.fbq) {
      try {
        window.fbq('track', eventName, defaultEventData);
      } catch (error) {
        console.error('Facebook Pixel tracking error:', error);
      }
    }

    if (window.ttq) {
      try {
        window.ttq.track(eventName, defaultEventData);
      } catch (error) {
        console.error('TikTok Pixel tracking error:', error);
      }
    }

    if (window.dataLayer) {
      try {
        window.dataLayer.push({
          event: eventName,
          ...defaultEventData,
        });
      } catch (error) {
        console.error('Google Tag Manager tracking error:', error);
      }
    }

    if (window.analytics) {
      try {
        window.analytics.track(eventName, defaultEventData);
      } catch (error) {
        console.error('Segment Analytics tracking error:', error);
      }
    }
  }
};

export function addFacebookPixel(pixelId) {
  console.log(pixelId, 'ini pixel id');
  // Create a script element
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

  const noScript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`;
  noScript.appendChild(img);
  document.body.appendChild(noScript);
}

export function addTikTokPixel(pixelId) {
  console.log(pixelId, 'ini TikTok pixel id');
  // Create TikTok Pixel script
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
}

export function addGoogleTagManager(gtmId) {
  // Google Tag Manager script
  const dataLayer = document.createElement('script');
  dataLayer.textContent = `
    window.dataLayer = window.dataLayer || [];
  `;
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
}

export function addLoginPixel(state, aff) {
  if (window.fbq) window.fbq('track', 'login');
  if (window.dataLayer)
    window.dataLayer.push({
      event: 'login',
    });

  const data = userData(state, aff);

  analytics.track('login', data);
  analytics.identify(data);
}

export function addLogoutPixel(state, aff) {
  if (window.fbq) window.fbq('track', 'logout');
  if (window.dataLayer)
    window.dataLayer.push({
      event: 'logout',
    });

  const data = userData(state, aff);

  analytics.track('logout', data);
  analytics.identify(data);
}
