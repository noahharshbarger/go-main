"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { performSolarCalculations } from "../Session2-CoreLogic/calculations";
import Modal from "./Modal";
import {
  containerVariants,
  itemVariants,
  resultVariants,
  buttonVariants,
  cardHoverVariants,
  loadingSpinnerVariants,
  sunIconVariants
} from "./animations";

/**
 * SESSION 4: ADVANCED FEATURES (45 minutes)
 * 
 * Learning Objectives:
 * - Implement Framer Motion animations
 * - Create modal components
 * - Add advanced interactions
 * - Prepare for deployment
 * 
 * Key Concepts Covered:
 * - Animation libraries integration
 * - Modal patterns and accessibility
 * - Event handling (click outside, escape key)
 * - Performance considerations
 * - Advanced React patterns
 * - User experience optimization
 */

const SolarCalculatorAdvanced = () => {
  const [inputs, setInputs] = useState({
    monthlyBill: "",
    homeSize: "",
    roofType: "shingle",
    location: "",
    electricityRate: 0.12,
    sunHours: 5.5,
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateInputs = () => {
    const newErrors = {};

    if (!inputs.monthlyBill || inputs.monthlyBill <= 0) {
      newErrors.monthlyBill = "Monthly bill is required";
    }

    if (!inputs.electricityRate || inputs.electricityRate <= 0) {
      newErrors.electricityRate = "Electricity rate is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateSolar = async () => {
    if (!validateInputs()) return;

    setIsCalculating(true);
    
    // Simulate realistic calculation time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const calculatedResults = performSolarCalculations(inputs);
    
    setResults(calculatedResults);
    setIsCalculating(false);
    setShowResults(true);
  };

  const openDetailsModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <motion.div 
        className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.h1 
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Solar Calculator - Session 4 ☀️
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Advanced features with animations, modals, and smooth interactions
          </motion.p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants}>
          {/* Animated Input Form */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Information
            </h2>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monthly Electric Bill ($)
              </label>
              <motion.input
                type="number"
                value={inputs.monthlyBill}
                onChange={(e) => handleInputChange("monthlyBill", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 text-black dark:text-white transition-all duration-200"
                placeholder="Enter your monthly bill"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Home Size (sq ft)
              </label>
              <motion.input
                type="number"
                value={inputs.homeSize}
                onChange={(e) => handleInputChange("homeSize", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 text-black dark:text-white transition-all duration-200"
                placeholder="Enter home size"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Roof Type
              </label>
              <motion.select
                value={inputs.roofType}
                onChange={(e) => handleInputChange("roofType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 text-black dark:text-white transition-all duration-200"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="shingle">Asphalt Shingle</option>
                <option value="tile">Tile</option>
                <option value="metal">Metal</option>
                <option value="flat">Flat</option>
              </motion.select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location (City, State)
              </label>
              <motion.input
                type="text"
                value={inputs.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 text-black dark:text-white transition-all duration-200"
                placeholder="e.g., Phoenix, AZ"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Electricity Rate ($/kWh)
              </label>
              <motion.input
                type="number"
                step="0.01"
                value={inputs.electricityRate}
                onChange={(e) => handleInputChange("electricityRate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 text-black dark:text-white transition-all duration-200"
                placeholder="0.12"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Average Daily Sun Hours
              </label>
              <motion.input
                type="number"
                step="0.1"
                value={inputs.sunHours}
                onChange={(e) => handleInputChange("sunHours", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 text-black dark:text-white transition-all duration-200"
                placeholder="5.5"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            <motion.button
              onClick={calculateSolar}
              disabled={isCalculating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    variants={loadingSpinnerVariants}
                    animate="animate"
                  />
                  Calculating...
                </div>
              ) : (
                "Calculate Solar Savings"
              )}
            </motion.button>
          </motion.div>

          {/* Animated Results Display */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <AnimatePresence mode="wait">
              {showResults && results && (
                <motion.div
                  variants={resultVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      Your Solar Results
                    </h2>
                    <motion.button
                      onClick={openDetailsModal}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      View Details →
                    </motion.button>
                  </div>
                  
                  <motion.div className="space-y-4" variants={containerVariants}>
                    <motion.div 
                      className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg" 
                      variants={itemVariants} 
                      whileHover={cardHoverVariants.hover}
                    >
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        Recommended System Size
                      </div>
                      <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {results.recommendedSystemSize} kW
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg" 
                      variants={itemVariants} 
                      whileHover={cardHoverVariants.hover}
                    >
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Estimated Cost (After Tax Credits)
                      </div>
                      <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                        ${results.estimatedCost.toLocaleString()}
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg" 
                      variants={itemVariants} 
                      whileHover={cardHoverVariants.hover}
                    >
                      <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                        Annual Savings
                      </div>
                      <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                        ${results.annualSavings.toLocaleString()}
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg" 
                      variants={itemVariants} 
                      whileHover={cardHoverVariants.hover}
                    >
                      <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        Payback Period
                      </div>
                      <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {results.paybackPeriod} years
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {!showResults && !isCalculating && (
                <motion.div 
                  className="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-6xl mb-4"
                      variants={sunIconVariants}
                      animate="animate"
                    >
                      ☀️
                    </motion.div>
                    <p className="text-gray-500 dark:text-gray-400">
                      Fill out the form to see your solar potential
                    </p>
                  </div>
                </motion.div>
              )}

              {isCalculating && (
                <motion.div 
                  className="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
                      variants={loadingSpinnerVariants}
                      animate="animate"
                    />
                    <motion.p 
                      className="text-gray-600 dark:text-gray-300 text-lg font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Calculating your solar potential...
                    </motion.p>
                    <motion.p 
                      className="text-gray-500 dark:text-gray-400 text-sm mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      Analyzing your energy usage and local conditions
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Teaching Notes */}
        <motion.div 
          className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          <h3 className="font-semibold text-blue-800 dark:text-blue-100 mb-2">
            📚 Session 4 Key Concepts:
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
            <li>• <strong>Framer Motion:</strong> Professional animations with physics-based transitions</li>
            <li>• <strong>Modal System:</strong> Accessible overlays with keyboard navigation</li>
            <li>• <strong>Advanced Interactions:</strong> Hover effects, focus states, and micro-interactions</li>
            <li>• <strong>Performance:</strong> AnimatePresence for mount/unmount animations</li>
            <li>• <strong>Accessibility:</strong> Escape key handling and focus management</li>
            <li>• <strong>Production Ready:</strong> Code splitting and optimization techniques</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Advanced Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={closeModal} 
        results={results} 
      />
    </>
  );
};

export default SolarCalculatorAdvanced;
