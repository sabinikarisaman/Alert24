import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiPercent } from 'react-icons/fi';

const PriceSummary = ({ totals, couponCode, compact = false }) => {
  const formatCurrency = (amount) => 
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);

  const isCouponValid = () => {
    if (!couponCode) return false;
    if (couponCode === 'NEW10' && totals.travellers >= 2) return true;
    if (couponCode === 'NEW20' && totals.travellers >= 4) return true;
    return false;
  };

  const items = [
    { label: 'Base Fare', value: totals.ticketTotal, description: `${totals.travellers} × ₹1,000` },
    { label: 'Life Jacket', value: totals.jacketTotal, description: `${totals.travellers} × ₹100` },
    { label: 'Service Charge', value: totals.serviceTotal || 0, description: `${totals.travellers} × ₹50` },
    { 
      label: 'GST (18%)', 
      value: totals.gstAmount, 
      description: `18% on base fare`,
      highlight: true 
    },
  ];

  if (couponCode) {
    items.push({
      label: `Coupon "${couponCode}"`,
      value: -totals.discount,
      description: isCouponValid() 
        ? `${totals.discountPercentage}% discount applied`
        : 'Invalid coupon',
      valid: isCouponValid(),
      invalid: !isCouponValid()
    });
  }

  return (
    <motion.div 
      className={`price-summary ${compact ? 'compact' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {!compact && (
        <div className="summary-header">
          <h3>Payment Details</h3>
          <div className="total-badge">
            <span>Total</span>
            <span className="amount">{formatCurrency(totals.finalAmount)}</span>
          </div>
        </div>
      )}
      
      <div className="price-items">
        {items.map((item, index) => (
          <motion.div 
            key={item.label}
            className={`price-item ${item.highlight ? 'highlight' : ''} ${item.valid ? 'valid' : ''} ${item.invalid ? 'invalid' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="item-label">
              <span>{item.label}</span>
              <span className="item-description">{item.description}</span>
            </div>
            <div className="item-value">
              {item.valid && <FiCheck className="valid-icon" />}
              {item.invalid && <FiX className="invalid-icon" />}
              <span className={item.value < 0 ? 'discount' : ''}>
                {item.value < 0 ? '-' : ''}{formatCurrency(Math.abs(item.value))}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="price-divider"></div>
      
      <motion.div 
        className="final-amount"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="final-label">
          <span>Amount to Pay</span>
          <span className="tax-info">(Inclusive of all taxes)</span>
        </div>
        <div className="final-value">
          {formatCurrency(totals.finalAmount)}
        </div>
      </motion.div>
      
      {!compact && totals.discount > 0 && (
        <motion.div 
          className="savings-badge"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <FiPercent />
          <span>You saved {formatCurrency(totals.discount)}!</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PriceSummary;