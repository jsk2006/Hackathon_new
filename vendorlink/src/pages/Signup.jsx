import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('vendor');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    const { error } = await signUp(email, password, userType);
    if (error) setError(error.message);
    else setSuccess(true);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <select value={userType} onChange={e => setUserType(e.target.value)}>
          <option value="vendor">Vendor</option>
          <option value="supplier">Supplier</option>
        </select>
        <button type="submit" disabled={loading}>Sign Up</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Signup successful! Please check your email to confirm.</div>}
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup; 