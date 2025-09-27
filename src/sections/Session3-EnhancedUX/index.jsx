"use client";
import React, { useState } from "react";
import { performSolarCalculations } from "../Session2-CoreLogic/calculations";
import LoadingSpinner from "./LoadingSpinner";
import ValidationErrors from "./ValidationErrors";

/**
 * SESSION 3: ENHANCED UX (45 minutes)
 * 
 * Learning Objectives:
 * - Implement loading states
 * - Add form validation
 * - Create better user feedback
 * - Organize components
 * 
 * Key Concepts Covered:
 * - Async operations simulation
 * - Form validation patterns
 * - Loading state management
 * - User feedback principles
 * - Component composition
 * - Error handling
 */

const SolarCalculatorEnhanced = () => {
  const [inputs, setInputs] = useState({
    monthlyBill: "",
    homeSize: "",
    electricityRate: 0.12,
    sunHours: 5.5,
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  /**
   * Comprehensive input validation
   * This demonstrates form validation patterns and user feedback
   */
  const validateInputs = () => {
    const newErrors = {};

    // Monthly bill validation
    if (!inputs.monthlyBill || inputs.monthlyBill <= 0) {
      newErrors.monthlyBill = "Monthly bill must be greater than $0";
    } else if (inputs.monthlyBill > 1000) {
      newErrors.monthlyBill = "Monthly bill seems unusually high (>$1000)";
    }

    // Home size validation
    if (!inputs.homeSize || inputs.homeSize <= 0) {
      newErrors.homeSize = "Home size must be greater than 0 sq ft";
    } else if (inputs.homeSize < 500) {
      newErrors.homeSize = "Home size seems small (<500 sq ft)";
    } else if (inputs.homeSize > 10000) {
      newErrors.homeSize = "Home size seems unusually large (>10,000 sq ft)";
    }

    // Electricity rate validation
    if (!inputs.electricityRate || inputs.electricityRate <= 0) {
      newErrors.electricityRate = "Electricity rate must be greater than $0/kWh";
    } else if (inputs.electricityRate > 0.50) {
      newErrors.electricityRate = "Electricity rate seems high (>$0.50/kWh)";
    }

    // Sun hours validation
    if (!inputs.sunHours || inputs.sunHours <= 0) {
      newErrors.sunHours = "Sun hours must be greater than 0";
    } else if (inputs.sunHours > 12) {
      newErrors.sunHours = "Sun hours cannot exceed 12 hours per day";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Enhanced calculation function with loading states and error handling
   */
  const calculateSolar = async () => {
    // Clear previous messages
    setSuccessMessage("");
    
    // Validate inputs first
    if (!validateInputs()) {
      return;
    }

    // Start loading state
    setIsCalculating(true);
    setShowResults(false);

    try {
      console.log("🔄 Starting calculations...");
      
      // Simulate API call or complex calculations with delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Perform calculations
      const calculatedResults = performSolarCalculations(inputs);
      
      console.log("✅ Calculations complete:", calculatedResults);
      
      // Update state with results
      setResults(calculatedResults);
      setShowResults(true);
      setSuccessMessage("Solar calculations completed successfully! 🎉");
      
    } catch (error) {
      console.error("❌ Calculation error:", error);
      setErrors({ general: "An error occurred during calculation. Please try again." });
    } finally {
      // Always stop loading, regardless of success or failure
      setIsCalculating(false);
    }
  };

  /**
   * Reset form and results
   */
  const resetForm = () => {
    setInputs({
      monthlyBill: 0,
      homeSize: 0,
      electricityRate: 0.12,
      sunHours: 5.5,
    });
    setResults(null);
    setShowResults(false);
    setErrors({});
    setSuccessMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Solar Calculator - Session 3
        </h1>
        <p className="text-gray-600">
          Enhanced UX with validation, loading states, and better feedback
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <span className="text-green-600 text-lg mr-2">✅</span>
            <span className="text-green-800 font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Validation Errors */}
      <ValidationErrors errors={errors} />

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Information
            </h2>
            <button
              onClick={resetForm}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Reset Form
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Electric Bill ($) *
            </label>
            <input
              type="number"
              value={inputs.monthlyBill}
              onChange={(e) => handleInputChange("monthlyBill", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.monthlyBill ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your monthly bill"
              disabled={isCalculating}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Size (sq ft) *
            </label>
            <input
              type="number"
              value={inputs.homeSize}
              onChange={(e) => handleInputChange("homeSize", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.homeSize ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter home size"
              disabled={isCalculating}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electricity Rate ($/kWh) *
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.electricityRate}
              onChange={(e) => handleInputChange("electricityRate", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.electricityRate ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="0.12"
              disabled={isCalculating}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Daily Sun Hours *
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.sunHours}
              onChange={(e) => handleInputChange("sunHours", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black ${
                errors.sunHours ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="5.5"
              disabled={isCalculating}
            />
          </div>

          <button
            onClick={calculateSolar}
            disabled={isCalculating}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            {isCalculating ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Calculating...
              </div>
            ) : (
              "Calculate Solar Savings"
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            * Required fields
          </p>
        </div>

        {/* Results Display */}
        <div className="space-y-6">
          {isCalculating ? (
            <LoadingSpinner 
              size="w-12 h-12" 
              message="Calculating your solar potential..."
            />
          ) : showResults && results ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Solar Results
              </h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-600 font-medium">
                    Recommended System Size
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {results.recommendedSystemSize} kW
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-600 font-medium">
                    Estimated Cost (After Tax Credits)
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    ${results.estimatedCost.toLocaleString()}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="text-sm text-yellow-600 font-medium">
                    Annual Savings
                  </div>
                  <div className="text-2xl font-bold text-yellow-900">
                    ${results.annualSavings.toLocaleString()}
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-600 font-medium">
                    Payback Period
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {results.paybackPeriod} years
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-4">☀️</div>
                <p>Fill out the form to see your solar potential</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Teaching Notes */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">
          📚 Session 3 Key Concepts:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Form Validation:</strong> Client-side validation with user feedback</li>
          <li>• <strong>Loading States:</strong> Better UX during async operations</li>
          <li>• <strong>Error Handling:</strong> Try-catch blocks and error messages</li>
          <li>• <strong>Component Composition:</strong> Reusable LoadingSpinner and ValidationErrors</li>
          <li>• <strong>Disabled States:</strong> Prevent actions during loading</li>
          <li>• <strong>Success Feedback:</strong> Positive reinforcement for users</li>
        </ul>
      </div>
    </div>
  );
};

export default SolarCalculatorEnhanced;
