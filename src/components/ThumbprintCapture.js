import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUpload, 
  FiCheck, 
  FiShield,
  FiCamera,
  FiLock,
  FiUser,
  FiCircle
} from 'react-icons/fi';

const ThumbprintCapture = ({ captured, onCapture }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        onCapture();
      }, 1500);
    }
  };

  const handleSimulateCapture = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      onCapture();
    }, 2000);
  };

  const handleScanCapture = () => {
    setShowScanner(true);
    setIsUploading(true);
    setTimeout(() => {
      setShowScanner(false);
      setIsUploading(false);
      onCapture();
    }, 3000);
  };

  return (
    <div className="thumbprint-section">
      <AnimatePresence mode="wait">
        {captured ? (
          <motion.div 
            key="captured"
            className="captured-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="captured-animation">
              <div className="success-circle">
                <FiCheck />
              </div>
              <div className="ripple"></div>
              <div className="ripple delay"></div>
            </div>
            <div className="captured-content">
              <h4>
                <FiShield />
                Identity Verified
              </h4>
              <p>Your thumbprint has been securely captured and verified</p>
              <div className="security-info">
                <FiLock />
                <span>256-bit SSL encrypted • GDPR compliant</span>
              </div>
            </div>
          </motion.div>
        ) : showScanner ? (
          <motion.div 
            key="scanner"
            className="scanner-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="scanner-container">
              <div className="scanner">
                <div className="scan-line"></div>
                <FiUser className="fingerprint-icon" />
              </div>
              <p className="scanner-text">Scanning thumbprint...</p>
              <div className="scanner-progress">
                <div className="progress-bar"></div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="options"
            className="capture-options"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="security-header">
              <FiShield className="security-icon" />
              <h4>Security Verification Required</h4>
              <p>Please verify your identity using one of the methods below</p>
            </div>
            
            <div className="capture-methods">
              <motion.div 
                className="method-card"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="method-icon">
                  <FiUpload />
                </div>
                <div className="method-content">
                  <h5>Upload File</h5>
                  <p>Upload an existing thumbprint image or document</p>
                  <input
                    type="file"
                    id="thumbprint-file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  <label htmlFor="thumbprint-file" className="method-btn">
                    {isUploading ? 'Uploading...' : 'Choose File'}
                  </label>
                </div>
              </motion.div>
              
              <motion.div 
                className="method-card"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="method-icon">
                  <FiCamera />
                </div>
                <div className="method-content">
                  <h5>Scan Now</h5>
                  <p>Use your device camera to scan thumbprint</p>
                  <button
                    onClick={handleScanCapture}
                    disabled={isUploading}
                    className="method-btn"
                  >
                    {isUploading ? 'Scanning...' : 'Start Scan'}
                  </button>
                </div>
              </motion.div>
              
              <motion.div 
                className="method-card"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="method-icon">
                  <FiUser />
                </div>
                <div className="method-content">
                  <h5>Simulate</h5>
                  <p>Quick simulation for testing purposes</p>
                  <button
                    onClick={handleSimulateCapture}
                    disabled={isUploading}
                    className="method-btn primary"
                  >
                    {isUploading ? 'Simulating...' : 'Simulate Capture'}
                  </button>
                </div>
              </motion.div>
            </div>
            
            <div className="security-notice">
              <FiLock />
              <p>
                <strong>Note:</strong> This is a simulated security verification. 
                No real biometric data is collected, stored, or transmitted.
                All data is processed locally on your device.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThumbprintCapture;