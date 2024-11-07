import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, ChevronRight, QrCode, Search, Heart, Download } from 'lucide-react';

const ActivatePage = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', position: 'relative' }}>
      {/* Social Media Sidebar */}
      <div
        style={{
          position: 'fixed',
          left: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          zIndex: 50,
        }}>
        <a
          href='#'
          style={{ color: '#666' }}>
          <Facebook size={20} />
        </a>
        <a
          href='#'
          style={{ color: '#666' }}>
          <Twitter size={20} />
        </a>
        <a
          href='#'
          style={{ color: '#666' }}>
          <Instagram size={20} />
        </a>
        <a
          href='#'
          style={{ color: '#666' }}>
          <Youtube size={20} />
        </a>
        <div style={{ height: '96px', width: '1px', backgroundColor: '#e5e5e5', margin: '0 auto' }} />
        <span style={{ fontSize: '14px', color: '#666', transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}>Follow Us</span>
      </div>

      {/* Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          zIndex: 40,
          borderBottom: '1px solid #e5e5e5',
          padding: '16px 0',
        }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px',
          }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            <a
              href='#'
              style={{ color: '#666', textDecoration: 'none' }}>
              Features
            </a>
            <a
              href='#'
              style={{ color: '#666', textDecoration: 'none' }}>
              Takaful
            </a>
            <a
              href='#'
              style={{ color: '#666', textDecoration: 'none' }}>
              Activate
            </a>
            <a
              href='#'
              style={{ color: '#666', textDecoration: 'none' }}>
              Blog
            </a>
          </div>
          <img
            src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gSgyIzzs0GKALaPZ3dQjZVupIOVnsY.png'
            alt='TheNoor Logo'
            style={{ height: '40px' }}
          />
          <button
            style={{
              backgroundColor: '#FF0099',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
            }}>
            GET THE APP
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '120px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ color: '#FF0099', marginBottom: '16px' }}>ACTIVATE</div>
          <h1
            style={{
              fontSize: '48px',
              color: '#1A237E',
              marginBottom: '24px',
              fontWeight: 'normal',
            }}>
            Activate Your Membership
            <br />
            Card Today
          </h1>
          <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>TheNoor Touch'nGO privileged card made specially for you. It's more than just a membership! Enjoy offers and discount from our various partners.</p>
        </div>
      </section>

      {/* App Interface Section */}
      <section style={{ padding: '64px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1200px', display: 'flex', gap: '64px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <img
              src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sToW2HPSMCHD0NLBOVB698RlE8oGD1.png'
              alt='App Interface'
              style={{ width: '100%', maxWidth: '400px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ maxWidth: '400px' }}>
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}>
                <h3>Tap to Scan</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>Start scan to Card Activation.</p>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}>
                <h3>Tap to Activate</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>Confirm the Card Activation.</p>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#FF0099',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <div>
                  <h3>Scan QR Code</h3>
                  <p style={{ fontSize: '14px' }}>Align QR code within frame to scan.</p>
                </div>
                <ChevronRight color='white' />
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}>
                <h3>Tap on Card & Merchants</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>Discover the merchants under TheNoor.</p>
              </div>

              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}>
                <h3>View Offers & Discounts</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>Enjoy the Offers and Discounts from any of our Merchants.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section style={{ padding: '64px 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <div style={{ color: '#FF0099', marginBottom: '16px' }}>FEEDBACK</div>
          <h2 style={{ fontSize: '36px', color: '#1A237E', marginBottom: '24px' }}>What Our Downloaders Say</h2>
          <p style={{ color: '#666', maxWidth: '800px', margin: '0 auto 48px' }}>We hear and thank all our downloaders around the world for the constructive feedbacks. Keep sending your feedbacks and comments for us to improve further.</p>

          <div style={{ display: 'flex', gap: '32px', overflowX: 'auto', padding: '16px 0' }}>
            {[
              {
                text: "Overall, it's a wonderful bug-free app. But please let the adzan notifications play the full adzan instead of a short one, there should be an option to choose the full or short version!",
                author: 'ImanSazly, iOS',
              },
              {
                text: 'Really love the app. so convenient to use. the interface is beautifully designed. congrats to the team!',
                author: 'aidzailan, iOS',
              },
              {
                text: "If the Al-Quran can be viewed (put as a choice) in the form of pages would be nicer cuz i love to read when in the form of pages. Navigation of the app can be improve to make it much more user friendly. Some of the features quite hidden. Overall it's a great app.",
                author: 'hxxiq, iOS',
              },
            ].map((feedback, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: 'white',
                  padding: '24px',
                  borderRadius: '8px',
                  flex: '0 0 350px',
                  textAlign: 'left',
                }}>
                <p style={{ marginBottom: '16px', color: '#666' }}>{feedback.text}</p>
                <p style={{ color: '#999', fontSize: '14px' }}>{feedback.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <h2 style={{ fontSize: '36px', color: '#1A237E', marginBottom: '24px' }}>We work with the best brands</h2>
          <p style={{ color: '#666', marginBottom: '32px' }}>Join TheNoor in creating the best Muslim lifestyle app that covers every aspects in our daily lives.</p>
          <button
            style={{
              backgroundColor: '#6C63FF',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '32px',
            }}>
            JOIN THE FORCE
          </button>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <img
              src='/placeholder.svg'
              alt='Touch n Go'
              style={{ height: '40px' }}
            />
            <img
              src='/placeholder.svg'
              alt='King Fahd'
              style={{ height: '40px' }}
            />
            <img
              src='/placeholder.svg'
              alt='Fipper'
              style={{ height: '40px' }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#f8f9fa', padding: '64px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          <div>
            <img
              src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gSgyIzzs0GKALaPZ3dQjZVupIOVnsY.png'
              alt='TheNoor Logo'
              style={{ height: '40px', marginBottom: '24px' }}
            />
          </div>

          <div>
            <h3 style={{ color: '#1A237E', marginBottom: '16px' }}>Features</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  Modern Al Quran Prayer
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  Real Time Location Detection
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  Translation Voice Over
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  Merchant Portal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1A237E', marginBottom: '16px' }}>Company</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  Team
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  About TheNoor
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#1A237E', marginBottom: '16px' }}>Contact</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  Facebook
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  Twitter
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  Instagram
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a
                  href='#'
                  style={{ color: '#666', textDecoration: 'none' }}>
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ActivatePage;
