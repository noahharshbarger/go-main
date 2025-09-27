"use client";
import React, { useState } from "react";
import { performSolarCalculations } from "./calculations";

/**
 * SESSION 2: CORE LOGIC (45 minutes)
 * 
 * Learning Objectives:
 * - Implement business logic calculations
 * - Work with mathematical formulas
 * - Format and display results
 * - Understand component lifecycle
 * 
 * Key Concepts Covered:
 * - Mathematical calculations in JavaScript
 * - Data formatting (toLocaleString, Math.round)
 * - Conditional rendering
 * - Component state updates
 * - Separation of concerns (calculations in separate file)
 */

const SolarCalculatorWithLogic = () => {
  const [inputs, setInputs] = useState({
    monthlyBill: "",
    homeSize: "",
    electricityRate: 0.12,
    sunHours: 5.5, // Added sun hours for calculations
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Perform solar calculations and update state
   * This demonstrates how to trigger calculations and update results
   */
  const calculateSolar = () => {
    // Validate inputs before calculating
    if (inputs.monthlyBill <= 0 || inputs.electricityRate <= 0) {
      alert("Please enter valid values for monthly bill and electricity rate");
      return;
    }

    console.log("🔥 Starting calculations with inputs:", inputs);
    
    // Perform calculations using our utility functions
    const calculatedResults = performSolarCalculations(inputs);
    
    console.log("✅ Calculation results:", calculatedResults);
    
    // Update state with results
    setResults(calculatedResults);
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Solar Calculator - Session 2
        </h1>
        <p className="text-gray-600">
          Core calculation logic and results display
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Electric Bill ($)
            </label>
            <input
              type="number"
              value={inputs.monthlyBill}
              onChange={(e) => handleInputChange("monthlyBill", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your monthly bill"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Home Size (sq ft)
            </label>
            <input
              type="number"
              value={inputs.homeSize}
              onChange={(e) => handleInputChange("homeSize", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter home size"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Electricity Rate ($/kWh)
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.electricityRate}
              onChange={(e) => handleInputChange("electricityRate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="0.12"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Daily Sun Hours
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.sunHours}
              onChange={(e) => handleInputChange("sunHours", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="5.5"
            />
            <p className="text-xs text-gray-500 mt-1">
              Phoenix: 6.5, Seattle: 3.5, Average US: 5.5
            </p>
          </div>

          <button
            onClick={calculateSolar}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Calculate Solar Savings
          </button>
        </div>

        {/* Results Display */}
        <div className="space-y-6">
          {showResults && results ? (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Solar Results
              </h2>
              
              <div className="space-y-4">
                {/* System Size */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-600 font-medium">
                    Recommended System Size
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {results.recommendedSystemSize} kW
                  </div>
                </div>

                {/* Cost */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-600 font-medium">
                    Estimated Cost (After Tax Credits)
                  </div>
                  <div className="text-2xl font-bold text-green-900">
                    ${results.estimatedCost.toLocaleString()}
                  </div>
                </div>

                {/* Annual Savings */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="text-sm text-yellow-600 font-medium">
                    Annual Savings
                  </div>
                  <div className="text-2xl font-bold text-yellow-900">
                    ${results.annualSavings.toLocaleString()}
                  </div>
                </div>

                {/* Payback Period */}
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-600 font-medium">
                    Payback Period
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {results.paybackPeriod} years
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <div className="text-sm text-emerald-600 font-medium">
                    CO₂ Reduction (Annual)
                  </div>
                  <div className="text-2xl font-bold text-emerald-900">
                    {results.co2Reduction} tons
                  </div>
                </div>
              </div>

              {/* Detailed breakdown */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  📊 Calculation Breakdown:
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Annual Usage: {results.details.annualUsage.toLocaleString()} kWh</div>
                  <div>Annual Production: {results.details.annualProduction.toLocaleString()} kWh</div>
                  <div>Total System Cost: ${results.details.totalCost.toLocaleString()}</div>
                  <div>Federal Tax Credit: ${results.details.taxCredit.toLocaleString()}</div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-4">☀️</div>
                <p>Enter your information and click calculate to see results</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Teaching Notes */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">
          📚 Session 2 Key Concepts:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Business Logic:</strong> Calculations separated into utility functions</li>
          <li>• <strong>Data Formatting:</strong> toLocaleString() for number formatting</li>
          <li>• <strong>Conditional Rendering:</strong> Show/hide results based on state</li>
          <li>• <strong>Validation:</strong> Check inputs before calculations</li>
          <li>• <strong>Console Debugging:</strong> Use console.log to debug calculations</li>
        </ul>
      </div>
    </div>
  );
};

export default SolarCalculatorWithLogic;
