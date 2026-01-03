import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FiUsers, 
  FiCalendar, 
  FiCreditCard, 
  FiCheckCircle,
  FiShield,
  FiNavigation,
  FiAnchor,
  FiLifeBuoy,
  FiMapPin,
  FiRadio,
  FiAlertTriangle
} from 'react-icons/fi';

import TravellerForm from './components/TravellerForm';
import PriceSummary from './components/PriceSummary';
import DatePicker from './components/DatePicker';
import ThumbprintCapture from './components/ThumbprintCapture';
import ProgressStepper from './components/ProgressStepper';
import './App.css';

function App() {
  const [travellers, setTravellers] = useState([
    { id: 1, name: '', contact: '', email: '' }
  ]);
  const [travelDate, setTravelDate] = useState('');
  const [thumbprintCaptured, setThumbprintCaptured] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [safetyTips, setSafetyTips] = useState([]);

  const safetyTipsList = [
    "Always wear your life jacket during the entire trip",
    "Keep emergency contact numbers handy",
    "Familiarize yourself with safety equipment locations",
    "Stay within designated safe zones",
    "Report any safety concerns immediately"
  ];

  useEffect(() => {
    // Rotate safety tips
    const interval = setInterval(() => {
      setSafetyTips(prev => {
        const newTips = [...prev];
        if (newTips.length >= 3) newTips.shift();
        newTips.push(safetyTipsList[Math.floor(Math.random() * safetyTipsList.length)]);
        return newTips;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { id: 1, label: 'Travelers', icon: <FiUsers />, color: '#3b82f6' },
    { id: 2, label: 'Date & Route', icon: <FiCalendar />, color: '#3b82f6' },
    { id: 3, label: 'Safety Check', icon: <FiShield />, color: '#f97316' },
    { id: 4, label: 'Confirmation', icon: <FiCheckCircle />, color: '#22c55e' }
  ];

  useEffect(() => {
    if (travellers.every(t => t.name && t.contact && /^\d{10}$/.test(t.contact))) {
      setActiveStep(2);
    }
    if (travelDate) {
      setActiveStep(3);
    }
    if (thumbprintCaptured) {
      setActiveStep(4);
    }
  }, [travellers, travelDate, thumbprintCaptured]);

  const addTraveller = () => {
    const newId = travellers.length + 1;
    setTravellers([...travellers, { id: newId, name: '', contact: '', email: '' }]);
    toast.success('Added new traveler to your safety group');
  };

  const removeTraveller = (id) => {
    if (travellers.length > 1) {
      setTravellers(travellers.filter(t => t.id !== id));
      toast.info('Traveler removed from group');
    }
  };

  const updateTraveller = (id, field, value) => {
    setTravellers(travellers.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const calculateTotal = () => {
    const ticketPerPerson = 1000;
    const jacketPerPerson = 100;
    const gstRate = 0.18;
    const safetyFee = 150;
    
    const baseTicket = travellers.length * ticketPerPerson;
    const jacketTotal = travellers.length * jacketPerPerson;
    const gstAmount = baseTicket * gstRate;
    const safetyTotal = travellers.length * safetyFee;
    
    let discount = 0;
    let discountPercentage = 0;
    
    if (couponCode === 'NEW10' && travellers.length >= 2) {
      discount = 100;
      discountPercentage = 5;
    } else if (couponCode === 'NEW20' && travellers.length >= 4) {
      discount = 200;
      discountPercentage = 8;
    }
    
    const subtotal = baseTicket + jacketTotal + gstAmount + safetyTotal;
    const finalAmount = subtotal - discount;
    
    return {
      travellers: travellers.length,
      ticketTotal: baseTicket,
      jacketTotal,
      gstAmount,
      safetyTotal,
      discount,
      discountPercentage,
      finalAmount,
      subtotal
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const allFieldsFilled = travellers.every(t => t.name && t.contact);
    const isContactValid = travellers.every(t => /^\d{10}$/.test(t.contact));
    
    if (!allFieldsFilled) {
      toast.error('All traveler details are required for safety');
      setIsSubmitting(false);
      return;
    }
    
    if (!isContactValid) {
      toast.error('Valid 10-digit contact numbers are required for emergency alerts');
      setIsSubmitting(false);
      return;
    }
    
    if (!travelDate) {
      toast.error('Please select your travel date for safety planning');
      setIsSubmitting(false);
      return;
    }
    
    if (!thumbprintCaptured) {
      toast.error('Safety verification required');
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      const totals = calculateTotal();
      
      toast.success(
        <div className="success-toast">
          <FiCheckCircle className="success-icon" />
          <div>
            <h3>Safety Booking Confirmed!</h3>
            <p>Amount: <strong>₹{totals.finalAmount}</strong></p>
            <p>Travel Date: {new Date(travelDate).toLocaleDateString()}</p>
            <p>Travelers: {totals.travellers}</p>
            <p className="safety-note">Safety briefing will be sent to your contact</p>
          </div>
        </div>,
        { autoClose: 6000 }
      );
      
      setIsSubmitting(false);
      
      setTimeout(() => {
        setTravellers([{ id: 1, name: '', contact: '', email: '' }]);
        setTravelDate('');
        setThumbprintCaptured(false);
        setCouponCode('');
        setActiveStep(1);
      }, 3000);
    }, 2000);
  };

  const totals = calculateTotal();

  return (
    <div className="app alert24-theme">
      <ToastContainer 
        position="top-right" 
        theme="colored"
        toastClassName="alert24-toast"
      />
      
      {/* Header */}
      <header className="header">
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="header-content"
        >
          <div className="logo-container">
            <div className="logo-icon">
              <FiNavigation className="pulse" />
            </div>
            <div className="logo-text">
              <h1>Alert<span className="highlight">24</span></h1>
              <p className="tagline">Maritime Safety Systems</p>
            </div>
          </div>
          
          <div className="header-safety">
            <div className="safety-badge">
              <FiShield />
              <span>Safety First Booking</span>
            </div>
            <div className="emergency-notice">
              <FiAlertTriangle />
              <span>Emergency Contact: 1800-ALERT24</span>
            </div>
          </div>
        </motion.div>
        
        {/* Safety Banner */}
        <div className="safety-banner">
          <FiRadio className="banner-icon" />
          <div className="banner-content">
            <h3>Real-Time Tracking Activated</h3>
            <p>Your booking includes GPS-enabled safety tracking for all travelers</p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-container">
        <div className="app-layout">
          {/* Safety Sidebar */}
          <motion.aside 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="sidebar safety-sidebar"
          >
            <div className="sidebar-card">
              <div className="safety-features">
                <h3><FiShield /> Included Safety Features</h3>
                <ul className="features-list">
                  <li>
                    <FiCheckCircle />
                    <span>GPS Life Jacket Tracking</span>
                  </li>
                  <li>
                    <FiCheckCircle />
                    <span>Emergency Signal Beacon</span>
                  </li>
                  <li>
                    <FiCheckCircle />
                    <span>Weather Alert System</span>
                  </li>
                  <li>
                    <FiCheckCircle />
                    <span>24/7 Rescue Coordination</span>
                  </li>
                  <li>
                    <FiCheckCircle />
                    <span>Medical Emergency Support</span>
                  </li>
                </ul>
              </div>
              
              <ProgressStepper steps={steps} activeStep={activeStep} />
              
              <div className="safety-tips">
                <h3><FiLifeBuoy /> Safety Tips</h3>
                <div className="tips-container">
                  {safetyTips.map((tip, index) => (
                    <motion.div 
                      key={index}
                      className="tip-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <FiAnchor />
                      <span>{tip}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="price-preview">
              <PriceSummary 
                totals={totals}
                couponCode={couponCode}
                compact={true}
              />
            </div>
          </motion.aside>

          {/* Booking Form */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="content safety-form"
          >
            <div className="form-header">
              <h2>
                <FiMapPin className="title-icon" />
                Maritime Safety Booking
              </h2>
              <p className="subtitle">Secure your journey with Alert24's life-saving technology</p>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              {/* Step 1: Travelers */}
              <motion.div 
                className="form-section safety-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="section-header">
                  <div className="step-indicator safety">01</div>
                  <h3>Traveler Safety Information</h3>
                  <span className="section-badge">
                    <FiUsers /> {travellers.length} {travellers.length === 1 ? 'Traveler' : 'Travelers'}
                  </span>
                </div>
                
                <div className="safety-note">
                  <FiAlertTriangle />
                  <p>Accurate information is crucial for emergency response and safety tracking</p>
                </div>
                
                <div className="travellers-grid">
                  <AnimatePresence>
                    {travellers.map((traveller) => (
                      <TravellerForm
                        key={traveller.id}
                        traveller={traveller}
                        onUpdate={updateTraveller}
                        onRemove={removeTraveller}
                        isRemovable={travellers.length > 1}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                
                <motion.button 
                  type="button" 
                  onClick={addTraveller}
                  className="btn-secondary safety-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiUsers />
                  Add Safety Group Member
                </motion.button>
              </motion.div>

              {/* Step 2: Date & Route */}
              <motion.div 
                className="form-section safety-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="section-header">
                  <div className="step-indicator safety">02</div>
                  <h3>Travel Date & Route Planning</h3>
                </div>
                <DatePicker value={travelDate} onChange={setTravelDate} />
                
                <div className="route-selection">
                  <h4>Select Safety Zone</h4>
                  <div className="route-options">
                    <label className="route-option">
                      <input type="radio" name="route" defaultChecked />
                      <div className="route-content">
                        <span className="route-name">Coastal Waters (Within 5km)</span>
                        <span className="route-desc">Standard safety monitoring</span>
                      </div>
                    </label>
                    <label className="route-option">
                      <input type="radio" name="route" />
                      <div className="route-content">
                        <span className="route-name">Offshore (5-20km)</span>
                        <span className="route-desc">Enhanced tracking required</span>
                      </div>
                    </label>
                    <label className="route-option">
                      <input type="radio" name="route" />
                      <div className="route-content">
                        <span className="route-name">Deep Sea (20km+)</span>
                        <span className="route-desc">Premium safety package</span>
                      </div>
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Step 3: Safety Verification */}
              <motion.div 
                className="form-section safety-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="section-header">
                  <div className="step-indicator safety">03</div>
                  <h3>Safety Verification & Identity Check</h3>
                  <span className="section-badge required">
                    <FiShield /> Mandatory
                  </span>
                </div>
                
                <div className="verification-note">
                  <p>This verification ensures emergency services can quickly identify and assist all travelers</p>
                </div>
                
                <ThumbprintCapture 
                  captured={thumbprintCaptured}
                  onCapture={() => {
                    setThumbprintCaptured(true);
                    toast.success('Identity verified for safety protocol');
                  }}
                />
              </motion.div>

              {/* Step 4: Payment & Safety Add-ons */}
              <motion.div 
                className="form-section safety-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="section-header">
                  <div className="step-indicator safety">04</div>
                  <h3>Safety Package & Payment</h3>
                </div>
                
                <div className="safety-addons">
                  <h4>Additional Safety Features</h4>
                  <div className="addon-options">
                    <label className="addon-option">
                      <input type="checkbox" defaultChecked />
                      <div className="addon-content">
                        <span className="addon-name">Emergency Medical Kit</span>
                        <span className="addon-price">+₹500</span>
                      </div>
                    </label>
                    <label className="addon-option">
                      <input type="checkbox" />
                      <div className="addon-content">
                        <span className="addon-name">Satellite Communication</span>
                        <span className="addon-price">+₹1,000</span>
                      </div>
                    </label>
                    <label className="addon-option">
                      <input type="checkbox" />
                      <div className="addon-content">
                        <span className="addon-name">Extended Warranty</span>
                        <span className="addon-price">+₹300</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="coupon-section safety-coupon">
                  <div className="coupon-input-group">
                    <input
                      type="text"
                      placeholder="Enter safety coupon code (NEW10, NEW20)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="coupon-input"
                    />
                    <button 
                      type="button"
                      className="btn-apply safety-apply"
                      onClick={() => {
                        if (couponCode && (couponCode === 'NEW10' || couponCode === 'NEW20')) {
                          toast.success(`Safety discount ${couponCode} applied!`);
                        } else if (couponCode) {
                          toast.error('Invalid safety coupon');
                        }
                      }}
                    >
                      Apply Safety Discount
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Final Price Summary */}
              <motion.div 
                className="form-section safety-summary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="section-header">
                  <h3>Safety Investment Summary</h3>
                </div>
                <PriceSummary 
                  totals={totals}
                  couponCode={couponCode}
                  compact={false}
                />
              </motion.div>

              {/* Safety Agreement & Submit */}
              <motion.div 
                className="submit-section safety-submit"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="safety-agreement">
                  <input type="checkbox" id="safety-terms" required />
                  <label htmlFor="safety-terms">
                    I acknowledge and agree to the <a href="#safety">Safety Protocols</a> and confirm that 
                    all travelers will participate in the mandatory safety briefing. I understand that 
                    accurate information is critical for emergency response.
                  </label>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="btn-primary safety-confirm"
                  disabled={!thumbprintCaptured || isSubmitting}
                  whileHover={{ scale: thumbprintCaptured && !isSubmitting ? 1.02 : 1 }}
                  whileTap={{ scale: thumbprintCaptured && !isSubmitting ? 0.98 : 1 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="safety-spinner"></div>
                      Activating Safety Systems...
                    </>
                  ) : thumbprintCaptured ? (
                    <>
                      <FiShield />
                      Confirm Safety Booking - ₹{totals.finalAmount.toLocaleString('en-IN')}
                    </>
                  ) : (
                    'Complete Safety Verification First'
                  )}
                </motion.button>
                
                <div className="security-assurance">
                  <FiShield className="assurance-icon" />
                  <div className="assurance-content">
                    <h4>Your Safety is Our Priority</h4>
                    <p>This booking activates real-time GPS tracking, emergency beacons, and 24/7 rescue coordination</p>
                  </div>
                </div>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer safety-footer">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <FiNavigation />
              <span>Alert24 Safety Systems</span>
            </div>
            <p className="footer-mission">Saving lives through advanced maritime safety technology</p>
          </div>
          
          <div className="footer-certifications">
            <span className="cert-badge">ISO 9001:2015</span>
            <span className="cert-badge">Maritime Safety Certified</span>
            <span className="cert-badge">24/7 Rescue Ready</span>
          </div>
          
          <div className="footer-contacts">
            <a href="#emergency">🚨 Emergency: 1800-ALERT24</a>
            <a href="#support">📞 Support: support@alert24.co.in</a>
            <a href="#safety">📋 Safety Guidelines</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;