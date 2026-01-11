import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 40, color = '#667eea' }) => {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        border: `3px solid rgba(102, 126, 234, 0.3)`,
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        display: 'inline-block'
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export default LoadingSpinner;