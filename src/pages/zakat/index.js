import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Calculator } from 'lucide-react';

const ZakatCalculator = () => {
  const [wealthType, setWealthType] = useState('cash');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [showSadaqahOption, setShowSadaqahOption] = useState(false);

  const calculateZakat = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      setResult('Please enter a valid amount');
      setShowSadaqahOption(false);
      return;
    }

    const nisabThreshold = 82312725; // Nisab threshold in Rupiah

    if (numAmount < nisabThreshold) {
      setResult('Nisab Not Fullfilled.');
      setShowSadaqahOption(true);
      return;
    }

    let zakatAmount = 0;
    switch (wealthType) {
      case 'cash':
      case 'gold':
      case 'silver':
        zakatAmount = numAmount * 0.025; // 2.5% for cash, gold, and silver
        break;
      case 'business':
        zakatAmount = numAmount * 0.025; // 2.5% for business assets
        break;
      case 'agriculture':
        zakatAmount = numAmount * 0.1; // 10% for irrigated crops
        break;
      default:
        zakatAmount = 0;
    }

    setResult(`Jumlah zakat Anda adalah: Rp ${zakatAmount.toLocaleString('id-ID', { minimumFractionDigits: 2 })}`);
    setShowSadaqahOption(false);
  };

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
          <div style={{ color: '#FF0099', marginBottom: '16px' }}>ZAKAT CALCULATOR</div>
          <h1
            style={{
              fontSize: '48px',
              color: '#1A237E',
              marginBottom: '24px',
              fontWeight: 'normal',
            }}>
            Calculate Your Zakat
            <br />
            with Ease
          </h1>
          <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>Use our Zakat calculator to determine the amount of Zakat you need to pay based on your wealth. It's simple, accurate, and follows Islamic principles.</p>
        </div>
      </section>

      {/* Calculator Section */}
      <section style={{ padding: '64px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}>
          <form
            onSubmit={calculateZakat}
            style={{
              backgroundColor: '#f8f9fa',
              padding: '32px',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor='wealthType'
                style={{ display: 'block', marginBottom: '8px', color: '#1A237E' }}>
                Type of Wealth
              </label>
              <select
                id='wealthType'
                value={wealthType}
                onChange={(e) => setWealthType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}>
                <option value='cash'>Cash</option>
                <option value='gold'>Gold</option>
                <option value='silver'>Silver</option>
                <option value='business'>Business Assets</option>
                <option value='agriculture'>Agricultural Produce</option>
              </select>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label
                htmlFor='amount'
                style={{ display: 'block', marginBottom: '8px', color: '#1A237E' }}>
                Amount (Rp)
              </label>
              <input
                type='number'
                id='amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Enter amount in Rupiah'
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
              />
            </div>
            <button
              type='submit'
              style={{
                backgroundColor: '#FF0099',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <Calculator
                size={20}
                style={{ marginRight: '8px' }}
              />
              Calculate Zakat
            </button>
          </form>
          {result && (
            <div
              style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: showSadaqahOption ? '#fff3e0' : '#e8f5e9',
                borderRadius: '8px',
                color: showSadaqahOption ? '#e65100' : '#1b5e20',
                textAlign: 'center',
                fontSize: '18px',
              }}>
              {result}
              {showSadaqahOption && (
                <div style={{ marginTop: '16px' }}>
                  <p>Do You want Donating?</p>
                  <button
                    style={{
                      backgroundColor: '#FF0099',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      marginTop: '8px',
                    }}>
                    Donate Now
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Other sections remain unchanged */}
    </div>
  );
};

export default ZakatCalculator;
