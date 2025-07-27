import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Login.css'; // Make sure this import path is correct

const Login = () => {
  const { signIn, signInWithGoogle, signInWithPhone, verifyPhoneOtp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await signIn(email, password);
    if (error) setError(error.message);
  };

  const handleGoogleLogin = async () => {
    setError('');
    const { error } = await signInWithGoogle();
    if (error) setError(error.message);
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await signInWithPhone(phone);
    if (error) setError(error.message);
    else setShowOtp(true);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await verifyPhoneOtp(phone, otp);
    if (error) setError(error.message);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form className="login-form" onSubmit={handleEmailLogin}>
        <input className="form-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="form-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button className="login-btn" type="submit" disabled={loading}>Login with Email</button>
      </form>

      <button className="login-btn" onClick={handleGoogleLogin} disabled={loading}>Login with Google</button>

      <form className="login-form" onSubmit={showOtp ? handleVerifyOtp : handlePhoneLogin}>
        <input className="form-input" type="tel" placeholder="Phone (+91...)" value={phone} onChange={e => setPhone(e.target.value)} required />
        {showOtp && (
          <input className="form-input" type="text" placeholder="OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
        )}
        <button className="login-btn" type="submit" disabled={loading}>{showOtp ? 'Verify OTP' : 'Send OTP'}</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="signup-text">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
