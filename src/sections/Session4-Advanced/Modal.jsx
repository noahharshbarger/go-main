import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants } from "./animations";

/**
 * MODAL COMPONENT WITH ADVANCED FEATURES
 * 
 * This demonstrates:
 * - Portal-like behavior (full-screen overlay)
 * - Advanced animations with Framer Motion
 * - Click-outside-to-close functionality
 * - Keyboard accessibility (Escape key)
 * - Event propagation handling
 */

const Modal = ({ isOpen, onClose, results }) => {
  // Handle escape key press
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Add event listener for escape key when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          variants={modalVariants.backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} // Click backdrop to close
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            variants={modalVariants.modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <motion.h3 
                className="text-2xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                📊 Detailed Solar Analysis
              </motion.h3>
              <motion.button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
              >
                ×
              </motion.button>
            </div>
            
            {results && (
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* System Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div 
                    className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                      🔧 System Specifications
                    </h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-2">
                      <li>• System Size: <strong>{results.recommendedSystemSize} kW</strong></li>
                      <li>• Estimated Panels: <strong>{Math.ceil(results.recommendedSystemSize / 0.4)} panels</strong></li>
                      <li>• Roof Space Needed: <strong>~{Math.ceil(results.recommendedSystemSize * 100)} sq ft</strong></li>
                      <li>• Panel Type: Monocrystalline Silicon</li>
                      <li>• Warranty: 25 years performance</li>
                    </ul>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                      💰 Financial Benefits
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-200 space-y-2">
                      <li>• Monthly Savings: <strong>${Math.round(results.annualSavings / 12)}</strong></li>
                      <li>• 5-Year Savings: <strong>${Math.round(results.annualSavings * 5).toLocaleString()}</strong></li>
                      <li>• 10-Year Savings: <strong>${Math.round(results.annualSavings * 10).toLocaleString()}</strong></li>
                      <li>• Federal Tax Credit: <strong>${Math.round(results.estimatedCost * 0.43).toLocaleString()}</strong></li>
                      <li>• Net Investment: <strong>${results.estimatedCost.toLocaleString()}</strong></li>
                    </ul>
                  </motion.div>
                </div>
                
                {/* Environmental Impact */}
                <motion.div 
                  className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg"
                  whileHover={{ scale: 1.01 }}
                >
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-3">
                    🌱 Environmental Impact
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-emerald-700 dark:text-emerald-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{results.co2Reduction}</div>
                      <div>tons CO₂/year</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{Math.round(results.co2Reduction * 16)}</div>
                      <div>trees planted equivalent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{Math.round(results.co2Reduction * 20)}</div>
                      <div>tons CO₂ over 20 years</div>
                    </div>
                  </div>
                </motion.div>

                {/* Timeline Breakdown */}
                <motion.div 
                  className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg"
                  whileHover={{ scale: 1.01 }}
                >
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
                    📅 Investment Timeline
                  </h4>
                  <div className="space-y-3 text-sm text-purple-700 dark:text-purple-200">
                    <div className="flex justify-between">
                      <span>Initial Investment:</span>
                      <span className="font-semibold">${results.estimatedCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Break-even Point:</span>
                      <span className="font-semibold">{results.paybackPeriod} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total 20-year Value:</span>
                      <span className="font-semibold text-green-600">
                        ${(results.annualSavings * 20 - results.estimatedCost).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Action Buttons */}
                <motion.div 
                  className="flex gap-3 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={onClose}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Got it! 👍
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      // Simulate sharing functionality
                      navigator.clipboard?.writeText(`Check out my solar analysis: ${results.recommendedSystemSize}kW system, $${results.annualSavings}/year savings!`);
                      alert("Results copied to clipboard!");
                    }}
                    className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    📋 Share Results
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
