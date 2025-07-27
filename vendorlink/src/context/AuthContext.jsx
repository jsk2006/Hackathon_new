import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Email/password signup with user type
  const signUp = async (email, password, userType) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { user_type: userType } },
    });
    return { data, error };
  };

  // Email/password login
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  // Google OAuth
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    return { data, error };
  };

  // Phone OTP
  const signInWithPhone = async (phone) => {
    const { data, error } = await supabase.auth.signInWithOtp({ phone });
    return { data, error };
  };
  const verifyPhoneOtp = async (phone, token) => {
    const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: 'sms' });
    return { data, error };
  };

  // Logout
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  // Redirect after login
  useEffect(() => {
    if (user) {
      const userType = user.user_metadata?.user_type;
      if (userType === 'vendor') navigate('/vendor-dashboard');
      else if (userType === 'supplier') navigate('/supplier-dashboard');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signInWithPhone, verifyPhoneOtp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 