"use client";
import { useState } from "react";

interface SolarInputs {
  monthlyBill: number;
  homeSize: number;
  roofType: string;
  location: string;
  electricityRate: number;
  sunHours: number;
}

interface SolarResults {
  recommendedSystemSize: number;
  estimatedCost: number;
  annualSavings: number;
  paybackPeriod: number;
  co2Reduction: number;
  twentyYearSavings: number;
}

const SolarCalculator = () => {
  const [inputs, setInputs] = useState<SolarInputs>({
    monthlyBill: 0,
    homeSize: 0,
    roofType: 'shingle',
    location: '',
    electricityRate: 0.12,
    sunHours: 5.5,
  });

  const [results, setResults] = useState<SolarResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateSolar = () => {
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

    const calculatedResults: SolarResults = {
      recommendedSystemSize: Math.round(systemSize * 100) / 100,
      estimatedCost: Math.round(netCost),
      annualSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Reduction: Math.round(co2ReductionPerYear * 100) / 100,
      twentyYearSavings: Math.round(twentyYearSavings),
    };

    setResults(calculatedResults);
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Solar Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Calculate your potential solar savings and system requirements
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Monthly Electric Bill ($)
            </label>
            <input
              type="number"
              value={inputs.monthlyBill}
              onChange={(e) => handleInputChange('monthlyBill', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter your monthly bill"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Home Size (sq ft)
            </label>
            <input
              type="number"
              value={inputs.homeSize}
              onChange={(e) => handleInputChange('homeSize', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter home size"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Roof Type
            </label>
            <select
              value={inputs.roofType}
              onChange={(e) => handleInputChange('roofType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="shingle">Asphalt Shingle</option>
              <option value="tile">Tile</option>
              <option value="metal">Metal</option>
              <option value="flat">Flat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location (City, State)
            </label>
            <input
              type="text"
              value={inputs.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="e.g., Phoenix, AZ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Electricity Rate ($/kWh)
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.electricityRate}
              onChange={(e) => handleInputChange('electricityRate', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="0.12"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Average Daily Sun Hours
            </label>
            <input
              type="number"
              step="0.1"
              value={inputs.sunHours}
              onChange={(e) => handleInputChange('sunHours', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="5.5"
            />
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
          {showResults && results && (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Your Solar Results
              </h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Recommended System Size
                  </div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {results.recommendedSystemSize} kW
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Estimated Cost (After Tax Credits)
                  </div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                    ${results.estimatedCost.toLocaleString()}
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <div className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
                    Annual Savings
                  </div>
                  <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                    ${results.annualSavings.toLocaleString()}
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    Payback Period
                  </div>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {results.paybackPeriod} years
                  </div>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                  <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                    CO₂ Reduction (Annual)
                  </div>
                  <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                    {results.co2Reduction} tons
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    20-Year Savings
                  </div>
                  <div className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">
                    ${results.twentyYearSavings.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Important Notes:
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Calculations are estimates based on average conditions</li>
                  <li>• Actual savings may vary based on local incentives and conditions</li>
                  <li>• Federal tax credit of 30% is included in cost calculations</li>
                  <li>• Consult with a solar professional for detailed analysis</li>
                </ul>
              </div>
            </>
          )}

          {!showResults && (
            <div className="flex items-center justify-center h-96 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">☀️</div>
                <p className="text-gray-500 dark:text-gray-400">
                  Fill out the form to see your solar potential
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolarCalculator;
