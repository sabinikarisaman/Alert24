import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPhone, FiMail, FiX } from 'react-icons/fi';

const TravellerForm = ({ traveller, onUpdate, onRemove, isRemovable }) => {
  const validateContact = (value) => {
    return /^\d{0,10}$/.test(value);
  };

  const handleChange = (field, value) => {
    if (field === 'contact' && !validateContact(value)) return;
    onUpdate(traveller.id, field, value);
  };

  return (
    <motion.div 
      className="traveller-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="card-header">
        <div className="traveller-number">
          <FiUser />
          <span>Traveller #{traveller.id}</span>
        </div>
        {isRemovable && (
          <motion.button 
            type="button" 
            onClick={() => onRemove(traveller.id)}
            className="remove-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX />
          </motion.button>
        )}
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor={`name-${traveller.id}`}>
            <FiUser className="input-icon" />
            Full Name *
          </label>
          <input
            type="text"
            id={`name-${traveller.id}`}
            value={traveller.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Doe"
            className={traveller.name ? 'filled' : ''}
          />
          {!traveller.name && (
            <span className="helper-text">Required</span>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor={`contact-${traveller.id}`}>
            <FiPhone className="input-icon" />
            Contact Number *
          </label>
          <div className="input-with-prefix">
            <span className="prefix">+91</span>
            <input
              type="tel"
              id={`contact-${traveller.id}`}
              value={traveller.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              placeholder="9876543210"
              maxLength="10"
              className={traveller.contact ? 'filled' : ''}
            />
          </div>
          {traveller.contact && !/^\d{10}$/.test(traveller.contact) && (
            <span className="error-message">Must be 10 digits</span>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor={`email-${traveller.id}`}>
            <FiMail className="input-icon" />
            Email Address
          </label>
          <input
            type="email"
            id={`email-${traveller.id}`}
            value={traveller.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            className={traveller.email ? 'filled' : ''}
          />
          {traveller.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(traveller.email) && (
            <span className="error-message">Invalid email</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TravellerForm;