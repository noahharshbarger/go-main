"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SolarCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyBill: 0,
    homeSize: 0,
    roofType: "shingle",
    location: "",
    electricityRate: 0.12,
    sunHours: 5.5,
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateSolar = async () => {
    setIsCalculating(true);
    
    // Add a small delay for better UX with loading animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const annualUsage = inputs.monthlyBill * 12 / inputs.electricityRate;
    const dailyUsage = annualUsage / 365;
    
    // System size calculation (kW)
    const systemSize = dailyUsage / inputs.sunHours / 0.8; // 80% efficiency factor
    
    // Cost calculations
    const costPerWatt = 3.50; // Average cost per watt installed
    const totalCost = systemSize * 1000 * costPerWatt;
    const federalTaxCredit = totalCost * 0.30; // 30% federal tax credit
    const netCost = totalCost - federalTaxCredit;
    
    // Savings calculations
    const annualProduction = systemSize * inputs.sunHours * 365 * 0.8;
    const annualSavings = annualProduction * inputs.electricityRate;
    const paybackPeriod = netCost / annualSavings;
    
    // Environmental impact
    const co2ReductionPerYear = annualProduction * 0.0007; // tons of CO2 per kWh
    
    // 20-year savings (assuming 3% electricity rate increase)
    let totalSavings = 0;
    let currentRate = inputs.electricityRate;
    for (let year = 1; year <= 20; year++) {
      currentRate *= 1.03;
      totalSavings += annualProduction * currentRate;
    }
    const twentyYearSavings = totalSavings - netCost;

    const calculatedResults = {
      recommendedSystemSize: Math.round(systemSize * 100) / 100,
      estimatedCost: Math.round(netCost),
      annualSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Reduction: Math.round(co2ReductionPerYear * 100) / 100,
      twentyYearSavings: Math.round(twentyYearSavings),
    };

    setResults(calculatedResults);
    setIsCalculating(false);
    setShowResults(true);
  };

  const openDetailsModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Modal Component
  const Modal = () => (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Detailed Solar Analysis
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                ✕
              </button>
            </div>
            
            {results && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">System Specifications</h4>
                    <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                      <li>• System Size: {results.recommendedSystemSize} kW</li>
                      <li>• Estimated Panels: {Math.ceil(results.recommendedSystemSize / 0.4)} panels</li>
                      <li>• Roof Space Needed: ~{Math.ceil(results.recommendedSystemSize * 100)} sq ft</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Financial Benefits</h4>
                    <ul className="text-sm text-green-700 dark:text-green-200 space-y-1">
                      <li>• Monthly Savings: ${Math.round(results.annualSavings / 12)}</li>
                      <li>• 10-Year Savings: ${Math.round(results.annualSavings * 10).toLocaleString()}</li>
                      <li>• Federal Tax Credit: ${Math.round(results.estimatedCost * 0.43).toLocaleString()}</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Environmental Impact</h4>
                  <ul className="text-sm text-emerald-700 dark:text-emerald-200 space-y-1">
                    <li>• CO₂ Reduced: {results.co2Reduction} tons/year</li>
                    <li>• Equivalent to planting {Math.round(results.co2Reduction * 16)} trees annually</li>
                    <li>• 20-year CO₂ reduction: {Math.round(results.co2Reduction * 20)} tons</li>
                  </ul>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={closeModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.div 
        className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.h1 
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Solar Calculator ☀️
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Calculate your potential solar savings and system requirements
          </motion.p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants}>
          {/* Input Form */}
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
                onChange={(e) => handleInputChange("monthlyBill", Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200"
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
                onChange={(e) => handleInputChange("homeSize", Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200"
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200"
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
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200"
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
                onChange={(e) => handleInputChange("electricityRate", Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200"
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
                onChange={(e) => handleInputChange("sunHours", Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200"
                placeholder="5.5"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            <motion.button
              onClick={calculateSolar}
              disabled={isCalculating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              {isCalculating ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Calculating...
                </div>
              ) : (
                "Calculate Solar Savings"
              )}
            </motion.button>
          </motion.div>

          {/* Results Display */}
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
                    <motion.div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        Recommended System Size
                      </div>
                      <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {results.recommendedSystemSize} kW
                      </div>
                    </motion.div>

                    <motion.div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Estimated Cost (After Tax Credits)
                      </div>
                      <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                        ${results.estimatedCost.toLocaleString()}
                      </div>
                    </motion.div>

                    <motion.div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                      <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                        Annual Savings
                      </div>
                      <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                        ${results.annualSavings.toLocaleString()}
                      </div>
                    </motion.div>

                    <motion.div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                      <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                        Payback Period
                      </div>
                      <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {results.paybackPeriod} years
                      </div>
                    </motion.div>

                    <motion.div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                        CO₂ Reduction (Annual)
                      </div>
                      <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                        {results.co2Reduction} tons
                      </div>
                    </motion.div>

                    <motion.div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                      <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                        20-Year Savings
                      </div>
                      <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
                        ${results.twentyYearSavings.toLocaleString()}
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    variants={itemVariants}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Important Notes:
                    </h3>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Calculations are estimates based on average conditions</li>
                      <li>• Actual savings may vary based on local incentives and conditions</li>
                      <li>• Federal tax credit of 30% is included in cost calculations</li>
                      <li>• Consult with a solar professional for detailed analysis</li>
                    </ul>
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
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
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
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                      Calculating your solar potential...
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                      Analyzing your energy usage and local conditions
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>

      <Modal />
    </>
  );
};

export default SolarCalculator;