import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div 
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={itemVariants}>
        Welcome Back
      </motion.h2>
      <motion.p 
        variants={itemVariants}
        style={{ 
          textAlign: 'center', 
          marginBottom: '30px', 
          color: '#666',
          fontSize: '14px'
        }}
      >
        Sign in to your account
      </motion.p>
      
      {error && (
        <motion.div 
          className="error"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}
      
      <motion.form onSubmit={handleSubmit} variants={itemVariants}>
        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="email">Email Address</label>
          <motion.input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <div className="input-highlight"></div>
        </motion.div>
        
        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="password">Password</label>
          <motion.input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <div className="input-highlight"></div>
        </motion.div>
        
        <motion.button 
          type="submit" 
          className="btn" 
          disabled={loading}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <div className="loading-spinner"></div>
              Signing In...
            </motion.div>
          ) : (
            'Sign In'
          )}
        </motion.button>
      </motion.form>
      
      {onSwitchToRegister && (
        <motion.div 
          className="switch-form"
          variants={itemVariants}
        >
          Don't have an account?{' '}
          <motion.button 
            type="button" 
            onClick={onSwitchToRegister}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#667eea', 
              textDecoration: 'underline', 
              cursor: 'pointer',
              fontWeight: '600'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Account
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Login;