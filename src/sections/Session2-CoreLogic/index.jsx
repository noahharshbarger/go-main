"use client";
import React, { useState } from "react";
import { performSolarCalculations } from "./calculations";

// /**
//  * SESSION 2: CORE LOGIC (45 minutes)
//  * 
//  * Learning Objectives:
//  * - Implement business logic calculations
//  * - Work with mathematical formulas
//  * - Format and display results
//  * - Understand component lifecycle
//  * 
//  * Key Concepts Covered:
//  * - Mathematical calculations in JavaScript
//  * - Data formatting (toLocaleString, Math.round)
//  * - Conditional rendering
//  * - Component state updates
//  * - Separation of concerns (calculations in separate file)
//  */

const SolarCalculatorWithLogic = () => {
  const [inputs, setInputs] = useState({
    monthlyBill: "",
    homeSize: "",
    electricityRate: 0.12, 
    sunHours: 5.5,
  });

  const [results, setResults] = useState(null); 
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const calculateSolar = () => {
    if (inputs.monthlyBill <= 0 || inputs.electricityRate <= 0) {
      alert("Please enter valid values for monthly bill and electricity rate");
      return;
    }

    console.log("Starting calculations with inputs:", inputs)

    const calculatedResults = performSolarCalculations(inputs);

    console.log("Calculation results")

    setResults(calculatedResults);
    setShowResults(true);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="grid md:grid-cols-2 gap-8">
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
              onChange ={(e) => handleInputChange("monthlyBill", e.target.value)}
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
                  <button
                    onClick={calculateSolar}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
                    >
                      Calculate Solar Savings
                    </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {showResults && results ? (
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
                    Estimated Cost (after tax credits)
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
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="text-sm text-red-600 font-medium">
                    Environmental Impact (Annual CO2 Reduction)
                  </div>
                  <div className="text-2xl font-bold text-red-900">
                    {results.co2Reduction} tons
                  </div>
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
    </div>
  );
};

export default SolarCalculatorWithLogic;