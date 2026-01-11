import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const EditProfile = ({ onCancel, onSuccess }) => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email || '',
    username: user?.username || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await updateProfile(formData);
    
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <motion.div 
      className="card"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h3 variants={itemVariants}>Edit Profile</motion.h3>
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
          <label htmlFor="email">Email:</label>
          <motion.input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <div className="input-highlight"></div>
        </motion.div>
        
        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="username">Username:</label>
          <motion.input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <div className="input-highlight"></div>
        </motion.div>
        
        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="first_name">First Name:</label>
          <motion.input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <div className="input-highlight"></div>
        </motion.div>
        
        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="last_name">Last Name:</label>
          <motion.input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <div className="input-highlight"></div>
        </motion.div>
        
        <motion.div className="form-group" variants={itemVariants}>
          <label htmlFor="phone">Phone:</label>
          <motion.input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <div className="input-highlight"></div>
        </motion.div>
        
        <motion.div 
          style={{ display: 'flex', gap: '10px' }}
          variants={itemVariants}
        >
          <motion.button 
            type="submit" 
            className="btn" 
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="loading-spinner"></div>
                Updating...
              </div>
            ) : (
              'Update Profile'
            )}
          </motion.button>
          <motion.button 
            type="button" 
            className="btn btn-secondary" 
            onClick={onCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default EditProfile;