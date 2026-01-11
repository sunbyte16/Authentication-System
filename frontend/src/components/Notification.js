import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ message, type = 'success', isVisible, onClose }) => {
  const notificationVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.3
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.3,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const getNotificationStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '15px 20px',
      borderRadius: '12px',
      color: 'white',
      fontWeight: '600',
      zIndex: 1000,
      minWidth: '300px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
      cursor: 'pointer'
    };

    switch (type) {
      case 'success':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #28a745, #20c997)',
        };
      case 'error':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #dc3545, #e74c3c)',
        };
      case 'info':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #17a2b8, #007bff)',
        };
      default:
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
        };
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={getNotificationStyle()}
          variants={notificationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{message}</span>
            <motion.button
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                marginLeft: '10px'
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              ×
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification;