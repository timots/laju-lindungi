import React from 'react';

const LoginPage = () => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const logoStyle = {
    width: '100px',
    height: '100px',
    margin: '0 auto 20px',
    display: 'block',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
  };

  const subtitleStyle = {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1877f2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const linkStyle = {
    color: '#1877f2',
    textDecoration: 'none',
    fontSize: '14px',
  };

  const linkContainerStyle = {
    textAlign: 'center',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <img
          src='/placeholder.svg?height=100&width=100'
          alt='LajuPeduli Logo'
          style={logoStyle}
        />
        <h1 style={titleStyle}>Login</h1>
        <p style={subtitleStyle}>Silahkan login jika sudah memiliki akun.</p>
        <form>
          <input
            type='text'
            placeholder='Email / Username / No Handphone'
            style={inputStyle}
          />
          <input
            type='password'
            placeholder='Password'
            style={inputStyle}
          />
          <button
            type='submit'
            style={buttonStyle}>
            Sign In
          </button>
        </form>
        <div style={linkContainerStyle}>
          <p>
            Belum punya akun?{' '}
            <a
              href='/register'
              style={linkStyle}>
              Register disini
            </a>
          </p>
          <p>
            Lupa Password?{' '}
            <a
              href='/reset-password'
              style={linkStyle}>
              Rubah Password disini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
