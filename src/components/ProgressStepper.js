import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

const ProgressStepper = ({ steps, activeStep }) => {
  return (
    <div className="progress-stepper safety-stepper">
      <div className="stepper-container">
        {steps.map((step, index) => {
          const isActive = step.id === activeStep;
          const isCompleted = step.id < activeStep;
          const isPending = step.id > activeStep;
          
          return (
            <motion.div 
              key={step.id}
              className={`stepper-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isPending ? 'pending' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="step-icon safety-icon" style={{ backgroundColor: step.color }}>
                {isCompleted ? (
                  <div className="checkmark safety-check">
                    <FiCheck />
                  </div>
                ) : isActive ? (
                  <div className="step-number safety-number">
                    {step.id}
                  </div>
                ) : (
                  <div className="step-number pending-number">
                    {step.id}
                  </div>
                )}
              </div>
              
              <div className="step-content">
                <div className="step-header">
                  <span className="step-label safety-label">{step.label}</span>
                  {isActive && (
                    <span className="step-status active-status">
                      <FiAlertCircle /> In Progress
                    </span>
                  )}
                  {isCompleted && (
                    <span className="step-status completed-status">
                      <FiCheck /> Verified
                    </span>
                  )}
                </div>
                
                <div className="step-connector">
                  {index < steps.length - 1 && (
                    <div className="connector-line safety-line">
                      <motion.div 
                        className="connector-progress safety-progress"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isCompleted ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ background: step.color }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="stepper-legend">
        <div className="legend-item">
          <div className="legend-dot completed"></div>
          <span>Completed & Verified</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot active"></div>
          <span>In Progress</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot pending"></div>
          <span>Upcoming</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;