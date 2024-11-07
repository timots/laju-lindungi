import React, { useState } from 'react';
import { Heart, Shield, Download, Plus, ChevronDown } from 'lucide-react';

const TakafulPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('12');
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          borderBottom: '1px solid #eee',
        }}>
        <img
          src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j5IRoQYIn86mYJck5P7fkxQmT3HXS2.png'
          alt='TheNoor Logo'
          style={{ height: '40px' }}
        />
        <button
          style={{
            backgroundColor: '#FF0099',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
          Check Coverage
        </button>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#00BFA5',
          }}>
          GetProtected <span style={{ fontWeight: 'normal' }}>with Takaful</span>
        </h1>
        <p style={{ color: '#666' }}>Get protected with Nurani Takaful (PA) as low as MYR 0.033 a day</p>
      </section>

      {/* What is Section */}
      <section
        style={{
          display: 'flex',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
          alignItems: 'center',
        }}>
        <img
          src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-j5IRoQYIn86mYJck5P7fkxQmT3HXS2.png'
          alt='Happy Children'
          style={{
            width: '50%',
            borderRadius: '1rem',
          }}
        />
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            What is <span style={{ color: '#FF0099' }}>Nurani Takaful (PA)?</span>
          </h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            This is a renewable product that provides compensation in the event of bodily injuries, disablement or death caused solely and directly by a sudden, unforeseen and fortuitous event that happens unexpectedly.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
            }}>
            <h2 style={{ fontSize: '1.8rem' }}>Benefits and Coverage</h2>
            <img
              src='/placeholder.svg'
              alt='Zurich Takaful'
              style={{ height: '40px' }}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
            }}>
            {/* Benefit Cards */}
            <div
              style={{
                backgroundColor: '#E0F7F6',
                padding: '2rem',
                borderRadius: '1rem',
                textAlign: 'center',
              }}>
              <div
                style={{
                  backgroundColor: '#00BFA5',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                <Plus color='white' />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Accidental Hospital Income</h3>
              <p>MYR 50 (Max for 30 Days)</p>
            </div>

            <div
              style={{
                backgroundColor: '#E0F7F6',
                padding: '2rem',
                borderRadius: '1rem',
                textAlign: 'center',
              }}>
              <div
                style={{
                  backgroundColor: '#00BFA5',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                <Heart color='white' />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Accidental Death & Permanent Disablement</h3>
              <p>MYR 25,000</p>
            </div>

            <div
              style={{
                backgroundColor: '#E0F7F6',
                padding: '2rem',
                borderRadius: '1rem',
                textAlign: 'center',
              }}>
              <div
                style={{
                  backgroundColor: '#00BFA5',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                <Shield color='white' />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Double Indemnity on Public Holiday</h3>
              <p>MYR 50,000</p>
            </div>

            <div
              style={{
                backgroundColor: '#00BFA5',
                padding: '2rem',
                borderRadius: '1rem',
                textAlign: 'center',
                color: 'white',
                cursor: 'pointer',
              }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                <Download color='white' />
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>Product Disclosure Sheet</h3>
              <p>Click to Download</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Plans */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '2rem' }}>Coverage Plans</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}>
            {[
              { months: '6', price: '6.00' },
              { months: '9', price: '9.00' },
              { months: '12', price: '12.00' },
            ].map((plan) => (
              <div
                key={plan.months}
                onClick={() => setSelectedPlan(plan.months)}
                style={{
                  padding: '1rem',
                  border: `2px solid ${selectedPlan === plan.months ? '#00BFA5' : '#eee'}`,
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}>
                <div>PA Protection</div>
                <div style={{ fontWeight: 'bold' }}>MYR {plan.price}</div>
                <div>{plan.months} Months</div>
              </div>
            ))}
          </div>

          {/* Personal Details Form */}
          <form style={{ marginTop: '3rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Personal Details</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Fullname</label>
                <input
                  type='text'
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '0.5rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Choose ID Type</label>
                <select
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '0.5rem',
                  }}>
                  <option>Please Select</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>NRIC No.</label>
                <input
                  type='text'
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '0.5rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Mobile No.</label>
                <input
                  type='tel'
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '0.5rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                <input
                  type='email'
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '0.5rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Address</label>
                <input
                  type='text'
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '0.5rem',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>City</label>
                  <input
                    type='text'
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '0.5rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>Postcode</label>
                  <input
                    type='text'
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '0.5rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem' }}>State</label>
                  <input
                    type='text'
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '0.5rem',
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              type='submit'
              style={{
                backgroundColor: '#FF0099',
                color: 'white',
                padding: '0.75rem 2rem',
                border: 'none',
                borderRadius: '9999px',
                marginTop: '2rem',
                cursor: 'pointer',
              }}>
              Buy Now MYR {selectedPlan}.00
            </button>
          </form>

          {/* FAQ Section */}
          <section style={{ marginTop: '4rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Frequently Asked Questions</h2>
            {[
              'How much contribution do I have to make?',
              'What are the applicable Shariah concepts?',
              'What are the covers/ benefits provided?',
              'Can I cancel my certificate?',
              'What do I need to do if there are changes to my contact/ personal details?',
            ].map((question, index) => (
              <div
                key={index}
                style={{
                  borderBottom: '1px solid #eee',
                  padding: '1rem 0',
                }}>
                <div
                  onClick={() => toggleQuestion(index)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#00BFA5',
                  }}>
                  {question}
                  <ChevronDown
                    style={{
                      transform: activeQuestion === index ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>
                {activeQuestion === index && <div style={{ padding: '1rem 0', color: '#666' }}>Answer to the question goes here...</div>}
              </div>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
};

export default TakafulPage;
