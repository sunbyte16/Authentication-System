import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import AdminPanel from './AdminPanel';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [protectedMessage, setProtectedMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const testProtectedRoute = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/protected');
      setProtectedMessage(response.data.message);
    } catch (error) {
      setProtectedMessage('Failed to access protected route');
    }
    setLoading(false);
  };

  const handleProfileUpdateSuccess = () => {
    setSuccessMessage('Profile updated successfully!');
    setActiveTab('profile');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handlePasswordChangeSuccess = () => {
    setSuccessMessage('Password changed successfully!');
    setActiveTab('profile');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <motion.div 
            className="card"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="profile"
          >
            <h2>User Profile</h2>
            {successMessage && (
              <motion.div 
                className="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {successMessage}
              </motion.div>
            )}
            <motion.div 
              className="profile-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Status:</strong> {user?.is_active ? 'Active' : 'Inactive'}</p>
                {user?.is_admin && <p><strong>Role:</strong> Administrator</p>}
              </motion.div>
              <motion.div variants={itemVariants}>
                <p><strong>First Name:</strong> {user?.first_name || 'Not set'}</p>
                <p><strong>Last Name:</strong> {user?.last_name || 'Not set'}</p>
                <p><strong>Phone:</strong> {user?.phone || 'Not set'}</p>
              </motion.div>
            </motion.div>
            <motion.div 
              style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button 
                onClick={() => setActiveTab('edit-profile')} 
                className="btn"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit Profile
              </motion.button>
              <motion.button 
                onClick={() => setActiveTab('change-password')} 
                className="btn"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Change Password
              </motion.button>
              <motion.button 
                onClick={testProtectedRoute} 
                className="btn btn-secondary" 
                disabled={loading}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="loading-spinner"></div>
                    Testing...
                  </div>
                ) : (
                  'Test Protected Route'
                )}
              </motion.button>
            </motion.div>
            <AnimatePresence>
              {protectedMessage && (
                <motion.div 
                  style={{ 
                    marginTop: '15px', 
                    padding: '10px', 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '4px' 
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {protectedMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      case 'edit-profile':
        return (
          <motion.div
            key="edit-profile"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <EditProfile
              onCancel={() => setActiveTab('profile')}
              onSuccess={handleProfileUpdateSuccess}
            />
          </motion.div>
        );
      case 'change-password':
        return (
          <motion.div
            key="change-password"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ChangePassword
              onCancel={() => setActiveTab('profile')}
              onSuccess={handlePasswordChangeSuccess}
            />
          </motion.div>
        );
      case 'admin':
        return user?.is_admin ? (
          <motion.div
            key="admin"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <AdminPanel />
          </motion.div>
        ) : (
          <motion.div 
            className="card"
            key="access-denied"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Access denied
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.nav 
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>Auth System</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>Welcome, {user?.username}!</span>
          {user?.is_admin && (
            <motion.span 
              className="admin-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
            >
              ADMIN
            </motion.span>
          )}
          <motion.button 
            onClick={logout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        </div>
      </motion.nav>
      
      <div className="dashboard">
        <motion.div 
          className="card" 
          style={{ marginBottom: '20px' }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div 
            className="tabs"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { key: 'profile', label: 'Profile' },
              { key: 'edit-profile', label: 'Edit Profile' },
              { key: 'change-password', label: 'Change Password' },
              ...(user?.is_admin ? [{ key: 'admin', label: 'Admin Panel' }] : [])
            ].map((tab, index) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`tab-button ${activeTab === tab.key ? 'active' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                custom={index}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Dashboard;