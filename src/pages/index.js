import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Play } from 'lucide-react';

const HomePage = () => {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        position: 'relative',
        minHeight: '100vh',
      }}>
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
              href='/takaful'
              style={{ color: '#666', textDecoration: 'none' }}>
              Takaful
            </a>
            <a
              href='/activate'
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
            src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Y6yKyDZBuguGAjgnbjwDZcIPLImLMz.png'
            alt='TheNoor Logo'
            style={{ height: '40px' }}
          />
          <a
            href='#'
            style={{
              backgroundColor: '#FF0099',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '9999px',
              textDecoration: 'none',
            }}>
            GET THE APP
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '128px', paddingBottom: '64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ color: '#FF0099', fontWeight: 500, marginBottom: '16px' }}>OUR FEATURES</div>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1A237E', marginBottom: '24px' }}>
            The Ultimate Lifestyle
            <br />
            Muslim App
          </h1>
          <p style={{ maxWidth: '768px', margin: '0 auto', color: '#666', marginBottom: '48px' }}>
            We innovate TheNoor with precision to produce the best yet functional Muslim lifestyle app that will be useful for everyone. Proudly made in Malaysia for the World.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div
            style={{
              backgroundColor: '#1A237E',
              borderRadius: '24px',
              padding: '64px',
              color: 'white',
              textAlign: 'center',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Can You See The Light™</h2>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Play
                  size={32}
                  color='white'
                />
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Vocal Matters</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Section */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '48px' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1A237E', marginBottom: '24px' }}>Focus on what matters the most</h2>
            <p style={{ color: '#666' }}>The world is moving fast and you have so many things to do. Just as the body requires physical needs such as food and water, the soul has spiritual needs.</p>
          </div>
          <div style={{ flex: 1 }}>
            <img
              src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yEAH0jE9Q6mfBJ09ek6hjiSgIfKU2W.png'
              alt='Focus'
              style={{ width: '100%', borderRadius: '16px' }}
            />
          </div>
        </div>
      </section>

      {/* Quran Player Section */}
      <section style={{ padding: '64px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '48px' }}>
          <div style={{ flex: 1 }}>
            <img
              src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JU1xLJMTsbtPf86xNw6RhLXuHQ1qlT.png'
              alt='App Screenshot'
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1A237E', marginBottom: '24px' }}>Modern and vibrant Al-Quran media player</h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>Listen to your favorite surah by replacing your in-car entertainment or treat it as on the go player. Connect to your bluetooth or AUX devices to have a better experience.</p>
            <img
              src='/placeholder.svg?height=32&width=120'
              alt='Bluetooth'
              style={{ height: '32px' }}
            />
          </div>
        </div>
      </section>

      {/* Wallet Section */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: '48px' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1A237E', marginBottom: '24px' }}>Wallet built with purpose</h2>
          </div>
          <div style={{ flex: 1 }}>
            <img
              src='/placeholder.svg?height=400&width=600'
              alt='Credit Cards'
              style={{ width: '100%', borderRadius: '16px' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
