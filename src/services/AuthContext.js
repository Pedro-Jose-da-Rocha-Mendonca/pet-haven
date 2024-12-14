import React, { createContext, useState, useContext, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://hkyyaftinggdrlfqfyfq.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreXlhZnRpbmdnZHJsZnFmeWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTUyNjEsImV4cCI6MjA0ODkzMTI2MX0.FAe5bopanFvIn6BVUczk2qmt9c0HP_XArYfwCz8V-_A'; // Fix typo in key

const supabase = createClient(supabaseUrl, supabaseKey); 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const initializeUser = async (session) => {
      if (!session?.user) return;
      
      try {
        const favorites = await loadFavorites(session.user.id);
        if (mounted) {
          setCurrentUser({
            ...session.user,
            favorites
          });
        }
      } catch (error) {
        console.error('Error loading user favorites:', error);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        initializeUser(session);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        initializeUser(session);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const signIn = async (email, password) => {
    console.log('Starting sign in process for:', email);
    try {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
  
      console.log('Calling supabase.auth.signInWithPassword...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
  
      console.log('After signInWithPassword call');
  
      console.log('signInWithPassword data:', data);
      console.log('signInWithPassword error:', error);
  
      if (error) {
        console.error('Auth error:', error);
        setError(error.message || 'Authentication failed');
        throw error;
      }
  
      if (!data || !data.user) {
        throw new Error('No user data received');
      }
  
      const userId = data.user.id;
      console.log('User ID:', userId);
  
      setCurrentUser(data.user);
      console.log('User signed in successfully');
    } catch (err) {
      console.error('Sign in failed:', err);
    }
  };

  const register = async (email, password) => {
    console.log('Starting registration for:', email);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
  
      console.log('Auth signup response:', { authData, authError });
  
      if (authError) {
        console.error('Signup error:', authError);
        if (authError.message.includes('User already registered')) {
          return {
            success: false,
            error: 'An account with this email already exists. Please sign in instead.',
            isExistingUser: true
          };
        }
        throw authError;
      }
  
      if (!authData?.user) {
        console.error('No user data in response');
        throw new Error('No user data in signup response');
      }

      const { error: insertError } = await supabase
        .from('users')
        .insert([{ 
          id: authData.user.id,
          centers: [] 
        }]);

      if (insertError) {
        console.error('Error creating user record:', insertError);
      }
  
      console.log('User registered successfully:', authData.user);
  
      return {
        success: true,
        message: 'Registration successful! Please check your email to verify your account.',
        requiresEmailConfirmation: true,
        userData: authData.user,
      };
    } catch (error) {
      console.error('Registration process failed:', error);
      return {
        success: false,
        error: error.message,
        isExistingUser: false
      };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const toggleFavorite = async (center) => {
    try {
      setError(null);
      if (!currentUser?.id) throw new Error('Must be logged in to favorite');
  
      const currentFavorites = currentUser.favorites || [];
      const isFavorited = currentFavorites.some(fav => fav.id === center.id);
      const newFavorites = isFavorited
        ? currentFavorites.filter(fav => fav.id !== center.id)
        : [...currentFavorites, center];
  
      const { error: updateError } = await supabase
        .from('users')
        .update({ centers: newFavorites })
        .eq('id', currentUser.id);
        
      if (updateError) throw updateError;
  
      setCurrentUser(prev => ({
        ...prev,
        favorites: newFavorites
      }));

      return true; 
    } catch (error) {
      setError('Failed to update favorites');
      console.error('Error in toggleFavorite:', error);
      throw error;
    }
  };

  const loadFavorites = async (userId) => {
    try {
      console.log('Loading favorites for user:', userId);
      let { data, error } = await supabase
        .from('users')
        .select('centers')
        .eq('id', userId)
        .single();

      console.log('Loaded favorites data:', data);

      if (error) {
        if (error.code === 'PGRST116') {
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([{ 
              id: userId,
              centers: []
            }])
            .select('centers')
            .single();
          
          if (insertError) throw insertError;
          return newUser?.centers || [];
        }
        throw error;
      }

      return data?.centers || [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  };

  const resendVerificationEmail = async (email) => {
    console.log('Resending verification email to:', email);
    try {
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
        });
        
        if (error) throw error;
        console.log('Verification email sent successfully to:', email);
        return { message: 'Verification email resent. Please check your inbox.' };
    } catch (error) {
        console.error('Error resending verification:', error);
        throw error;
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    signIn,
    register,
    signOut,
    toggleFavorite,
    loadFavorites,
    resendVerificationEmail,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};