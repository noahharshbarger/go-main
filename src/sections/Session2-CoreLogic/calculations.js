/**
 * SOLAR CALCULATION UTILITIES
 * 
 * This file contains all the mathematical formulas for solar calculations.
 * Breaking this into a separate file demonstrates:
 * - Separation of concerns
 * - Reusable utility functions
 * - Easier testing and debugging
 */

/**
 * Calculate annual energy usage from monthly bill
 * @param {number} monthlyBill - Monthly electricity bill in dollars
 * @param {number} electricityRate - Rate per kWh in dollars
 * @returns {number} Annual energy usage in kWh
 */
export const calculateAnnualUsage = (monthlyBill, electricityRate) => {
  const bill = parseFloat(monthlyBill) || 0;
  const rate = parseFloat(electricityRate) || 0;
  if (rate <= 0) return 0;
  return (bill * 12) / rate;
};

/**
 * Calculate required solar system size
 * @param {number} annualUsage - Annual energy usage in kWh
 * @param {number} sunHours - Average daily sun hours
 * @returns {number} System size in kW
 */
export const calculateSystemSize = (annualUsage, sunHours = 5.5) => {
  if (sunHours <= 0) return 0;
  const dailyUsage = annualUsage / 365;
  const systemEfficiency = 0.8; // 80% system efficiency
  return dailyUsage / sunHours / systemEfficiency;
};

/**
 * Calculate system cost with tax credits
 * @param {number} systemSize - System size in kW
 * @param {number} costPerWatt - Cost per watt installed (default $3.50)
 * @returns {object} Object with totalCost, taxCredit, and netCost
 */
export const calculateSystemCost = (systemSize, costPerWatt = 3.50) => {
  const size = parseFloat(systemSize) || 0;
  const cost = parseFloat(costPerWatt) || 3.50;
  const totalCost = size * 1000 * cost; // Convert kW to watts
  const federalTaxCredit = totalCost * 0.30; // 30% federal tax credit
  const netCost = totalCost - federalTaxCredit;
  
  return {
    totalCost: Math.round(totalCost),
    taxCredit: Math.round(federalTaxCredit),
    netCost: Math.round(netCost)
  };
};

/**
 * Calculate annual energy production and savings
 * @param {number} systemSize - System size in kW
 * @param {number} sunHours - Average daily sun hours
 * @param {number} electricityRate - Rate per kWh in dollars
 * @returns {object} Object with annual production and savings
 */
export const calculateSavings = (systemSize, sunHours = 5.5, electricityRate) => {
  const size = parseFloat(systemSize) || 0;
  const hours = parseFloat(sunHours) || 5.5;
  const rate = parseFloat(electricityRate) || 0;
  const systemEfficiency = 0.8; // 80% system efficiency
  const annualProduction = size * hours * 365 * systemEfficiency;
  const annualSavings = annualProduction * rate;
  
  return {
    annualProduction: Math.round(annualProduction),
    annualSavings: Math.round(annualSavings)
  };
};

/**
 * Calculate payback period
 * @param {number} netCost - Net system cost after tax credits
 * @param {number} annualSavings - Annual savings in dollars
 * @returns {number} Payback period in years
 */
export const calculatePaybackPeriod = (netCost, annualSavings) => {
  if (annualSavings <= 0) return 0;
  return Math.round((netCost / annualSavings) * 10) / 10; // Round to 1 decimal
};

/**
 * Calculate environmental impact (CO2 reduction)
 * @param {number} annualProduction - Annual energy production in kWh
 * @returns {number} CO2 reduction in tons per year
 */
export const calculateCO2Reduction = (annualProduction) => {
  const co2PerKwh = 0.0007; // tons of CO2 per kWh (average grid mix)
  return Math.round(annualProduction * co2PerKwh * 100) / 100; // Round to 2 decimals
};

/**
 * Main calculation function that combines all calculations
 * @param {object} inputs - Input object with all user data
 * @returns {object} Complete results object
 */
export const performSolarCalculations = (inputs) => {
  const { monthlyBill, electricityRate, sunHours = 5.5 } = inputs;
  
  // Step 1: Calculate annual usage
  const annualUsage = calculateAnnualUsage(monthlyBill, electricityRate);
  
  // Step 2: Calculate system size needed
  const systemSize = calculateSystemSize(annualUsage, sunHours);
  
  // Step 3: Calculate costs
  const costData = calculateSystemCost(systemSize);
  
  // Step 4: Calculate savings
  const savingsData = calculateSavings(systemSize, sunHours, electricityRate);
  
  // Step 5: Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(costData.netCost, savingsData.annualSavings);
  
  // Step 6: Calculate environmental impact
  const co2Reduction = calculateCO2Reduction(savingsData.annualProduction);
  
  return {
    recommendedSystemSize: Math.round(systemSize * 100) / 100,
    estimatedCost: costData.netCost,
    annualSavings: savingsData.annualSavings,
    paybackPeriod: paybackPeriod,
    co2Reduction: co2Reduction,
    // Additional detailed data
    details: {
      annualUsage,
      annualProduction: savingsData.annualProduction,
      totalCost: costData.totalCost,
      taxCredit: costData.taxCredit
    }
  };
};
