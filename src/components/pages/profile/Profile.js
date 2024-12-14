import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../services/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ centers = [] }) => {
  const { currentUser, toggleFavorite, signIn, register, loadFavorites, setCurrentUser, signOut, error: authError, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState('');

  const favoriteCenters = currentUser?.favorites || [];

  useEffect(() => {
    return () => {
      setLocalError('');
      setLoading(false);
    };
  }, []);

  const loadUserFavorites = React.useCallback(async () => {
    if (loading || !currentUser?.id || currentUser?.favorites) return;

    setLoading(true);
    try {
      const favorites = await loadFavorites(currentUser.id);
      if (favorites?.length > 0) {
        setCurrentUser(prev => ({
          ...prev,
          favorites: favorites
        }));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setLocalError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id, currentUser?.favorites, loading, loadFavorites, setCurrentUser]);

  useEffect(() => {
    loadUserFavorites();
  }, [loadUserFavorites]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setLoading(true);
    
    try {
      if (isSignIn) {
        const response = await signIn(email, password);
        
        if (response?.user) {
          setEmail('');
          setPassword('');
          navigate('/profile', { replace: true });
        } else {
          throw new Error('Sign in failed - No user data received');
        }
      } else {
        const response = await register(email, password);
        
        if (response.success) {
          setEmail('');
          setPassword('');
          setIsSignIn(true);
          setLocalError(response.message);
        } else if (response.isExistingUser) {
          setLocalError(response.error);
          setIsSignIn(true);
        } else {
          setLocalError(response.error || 'Registration failed - please try again');
        }
      }
    } catch (err) {
      setLocalError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      setCurrentUser(null);
      navigate('/', { replace: true });
    } catch (err) {
      setLocalError('Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      const result = await resendVerificationEmail(email);
      setLocalError(result.message);
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="profile-container auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">{isSignIn ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="auth-subtitle">
            {isSignIn 
              ? 'Sign in to manage your favorite centers' 
              : 'Join us to start saving your favorite centers'}
          </p>
          {(localError || authError) && (
            <div className="error-message">{localError || authError}</div>
          )}
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="auth-submit-btn">
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
            <div className="auth-separator">
              <span>or</span>
            </div>
            <button 
              type="button" 
              className="toggle-auth-btn"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </button>
          </form>
          {localError && localError.includes('verify your email') && (
            <button 
              type="button" 
              onClick={handleResendVerification}
              className="resend-verification-btn"
            >
              Resend Verification Email
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {(localError || authError) && (
        <div className="error-message">{localError || authError}</div>
      )}
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <>
          <div className="profile-header">
            <h1>My Profile</h1>
            <button onClick={handleSignOut} className="sign-out-btn">
              Sign Out
            </button>
          </div>
          <div className="profile-info">
            <h2>Welcome, {currentUser.email}</h2>
          </div>
          
          <div className="favorites-section">
            <h2>Favorite Centers</h2>
            <div className="favorites-grid">
              {favoriteCenters.length === 0 ? (
                <p>You haven't added any favorite centers yet. Browse centers to add some!</p>
              ) : (
                favoriteCenters.map(center => (
                  <div key={center.id} className="favorite-card">
                    <div className="card-header">
                      <h3 className="center-name">{center.name}</h3>
                    </div>
                    <div className="card-body">
                      <div className="address">
                        {center.address && typeof center.address === 'object' ? (
                          <p>{`${center.address.city}, ${center.address.state} ${center.address.postalcode}`}</p>
                        ) : (
                          <p>{center.citystate}</p>
                        )}
                      </div>
                      <div className="contact-info">
                        {center.phone && (
                          <div className="contact-item">
                            <span className="icon">📞</span>
                            <span>{center.phone}</span>
                          </div>
                        )}
                        {center.email && (
                          <div className="contact-item">
                            <span className="icon">📧</span>
                            <span>{center.email}</span>
                          </div>
                        )}
                        {center.website && (
                          <div className="contact-item">
                            <span className="icon">🌐</span>
                            <a href={center.website} target="_blank" rel="noopener noreferrer">
                              Visit Website
                            </a>
                          </div>
                        )}
                      </div>
                      <button className="remove-favorite-btn" onClick={() => toggleFavorite(center)}>
                        Remove from Favorites
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
      {loading && <div className="loading-overlay">Loading...</div>}
    </div>
  );
};

export default Profile;