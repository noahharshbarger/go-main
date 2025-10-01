'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Calculator() {
  // Form state
  const [formData, setFormData] = useState({
    monthlyBill: '',
    monthlyKwh: '',
    location: '',
    roofSize: '',
    panelManufacturer: 'mixed', // domestic, foreign, mixed
    inverterType: 'string', // string, micro, power-optimizer
    mountingSystem: 'standard', // standard, premium
    projectSize: 'residential' // residential, commercial
  })
  
  // Results state
  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState({})

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.monthlyBill || parseFloat(formData.monthlyBill) <= 0) {
      newErrors.monthlyBill = 'Please enter a valid monthly bill amount'
    }
    
    if (!formData.monthlyKwh || parseFloat(formData.monthlyKwh) <= 0) {
      newErrors.monthlyKwh = 'Please enter a valid kWh usage'
    }
    
    if (!formData.location) {
      newErrors.location = 'Please select your location'
    }
    
    if (!formData.roofSize || parseFloat(formData.roofSize) <= 0) {
      newErrors.roofSize = 'Please enter a valid roof size'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsCalculating(true)
    
    // Simulate calculation time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Calculate results
    const calculatedResults = calculateSolarNeeds(formData)
    setResults(calculatedResults)
    setIsCalculating(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Solar Calculator
          </h1>
          <p className="text-gray-600">
            Enter your energy details to get solar recommendations
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Your Energy Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Monthly Bill */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Electric Bill ($)
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.monthlyBill}
                  onChange={(e) => handleInputChange('monthlyBill', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.monthlyBill ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 150.00"
                />
                {errors.monthlyBill && (
                  <p className="text-red-500 text-sm mt-1">{errors.monthlyBill}</p>
                )}
              </div>

              {/* Monthly kWh */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly kWh Usage
                </label>
                <input 
                  type="number" 
                  value={formData.monthlyKwh}
                  onChange={(e) => handleInputChange('monthlyKwh', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.monthlyKwh ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 900"
                />
                {errors.monthlyKwh && (
                  <p className="text-red-500 text-sm mt-1">{errors.monthlyKwh}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select 
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your state</option>
                  <option value="california">California</option>
                  <option value="texas">Texas</option>
                  <option value="florida">Florida</option>
                  <option value="arizona">Arizona</option>
                  <option value="nevada">Nevada</option>
                  <option value="colorado">Colorado</option>
                  <option value="north-carolina">North Carolina</option>
                  <option value="new-york">New York</option>
                </select>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              {/* Roof Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Roof Space (sq ft)
                </label>
                <input 
                  type="number" 
                  value={formData.roofSize}
                  onChange={(e) => handleInputChange('roofSize', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.roofSize ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 800"
                />
                {errors.roofSize && (
                  <p className="text-red-500 text-sm mt-1">{errors.roofSize}</p>
                )}
              </div>

              {/* Panel Manufacturer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Panel Manufacturing Preference
                </label>
                <select 
                  value={formData.panelManufacturer}
                  onChange={(e) => handleInputChange('panelManufacturer', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="domestic">Domestic Only (Made in USA)</option>
                  <option value="foreign">Foreign Only (Imported)</option>
                  <option value="mixed">Mixed (Best Value)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.panelManufacturer === 'domestic' && 'Higher cost, Buy America compliant, maximum incentives'}
                  {formData.panelManufacturer === 'foreign' && 'Lower cost, subject to tariffs, limited incentives'}
                  {formData.panelManufacturer === 'mixed' && 'Balance of cost and compliance requirements'}
                </p>
              </div>

              {/* Inverter Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inverter System Type
                </label>
                <select 
                  value={formData.inverterType}
                  onChange={(e) => handleInputChange('inverterType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="string">String Inverters</option>
                  <option value="micro">Microinverters</option>
                  <option value="power-optimizer">Power Optimizers</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Different inverter types have different domestic content percentages
                </p>
              </div>

              {/* Project Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Type
                </label>
                <select 
                  value={formData.projectSize}
                  onChange={(e) => handleInputChange('projectSize', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="residential">Residential (&lt; 20 kW)</option>
                  <option value="commercial">Commercial (20+ kW)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Project size affects component sourcing requirements
                </p>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isCalculating}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isCalculating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </div>
                ) : 'Calculate Solar Needs'}
              </button>
            </form>
          </div>

          {/* Results Display */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Your Solar Solution
            </h2>
            
            {!results ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">⚡</div>
                <p className="text-gray-500 text-lg">
                  Enter your information to see solar recommendations
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* System Overview */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-900">System Overview</h3>
                    <div className="text-blue-600 text-2xl">⚡</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700">System Size: <span className="font-bold">{results.systemSize} kW</span></p>
                      <p className="text-blue-700">Annual Production: <span className="font-bold">{results.annualProduction.toLocaleString()} kWh</span></p>
                    </div>
                    <div>
                      <p className="text-blue-700">System Cost: <span className="font-bold">${results.estimatedCost.toLocaleString()}</span></p>
                      <p className="text-blue-700">Annual Savings: <span className="font-bold">${results.annualSavings.toLocaleString()}</span></p>
                    </div>
                  </div>
                </div>

                {/* Domestic vs Foreign Content */}
                <div className="bg-gradient-to-r from-green-50 to-red-50 p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Domestic vs Foreign Content</h3>
                    <div className="text-2xl">�🇸</div>
                  </div>
                  
                  {/* Overall Percentages */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall System Content</span>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-green-700 font-bold">
                          {results.domesticContent.totalDomesticPercent}% Domestic
                        </span>
                        <span className="text-red-700 font-bold">
                          {results.domesticContent.totalForeignPercent}% Foreign
                        </span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-500 h-3 rounded-l-full" 
                        style={{ width: `${results.domesticContent.totalDomesticPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Component Breakdown */}
                  <div className="space-y-2 text-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Component Breakdown:</h4>
                    
                    {Object.entries(results.domesticContent.breakdown).map(([component, data]) => (
                      <div key={component} className="flex justify-between items-center py-1">
                        <span className="capitalize">{component}:</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-600 font-medium">{data.domesticPercent}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${data.domesticPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buy America Compliance */}
                <div className={`p-4 rounded-lg border ${
                  results.domesticContent.buyAmericaCompliant 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${
                      results.domesticContent.buyAmericaCompliant ? 'text-green-900' : 'text-yellow-900'
                    }`}>
                      {results.domesticContent.buyAmericaCompliant ? '✅' : '⚠️'} Buy America Act Compliance
                    </h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      results.domesticContent.buyAmericaCompliant 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {results.domesticContent.buyAmericaCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    results.domesticContent.buyAmericaCompliant ? 'text-green-700' : 'text-yellow-700'
                  }`}>
                    {results.domesticContent.complianceNote}
                  </p>
                  {!results.domesticContent.buyAmericaCompliant && (
                    <p className="text-xs text-yellow-600 mt-2">
                      Requires 55% domestic content for federal projects. Consider domestic panels to achieve compliance.
                    </p>
                  )}
                </div>

                {/* Cost Impact */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">💰 Cost Impact by Source</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-700">
                        Domestic Content: <span className="font-bold">
                          ${Math.round(results.estimatedCost * results.domesticContent.totalDomesticCost).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-xs text-green-600">
                        ({Math.round(results.domesticContent.totalDomesticCost * 100)}% of system cost)
                      </p>
                    </div>
                    <div>
                      <p className="text-red-700">
                        Foreign Content: <span className="font-bold">
                          ${Math.round(results.estimatedCost * results.domesticContent.totalForeignCost).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-xs text-red-600">
                        ({Math.round(results.domesticContent.totalForeignCost * 100)}% of system cost)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Next Step Button */}
                <div className="pt-4">
                  <Link 
                    href={`/compare?systemSize=${results.systemSize}&location=${formData.location}&panelType=${formData.panelManufacturer}`}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-center block hover:bg-blue-700 transition-colors"
                  >
                    Compare Different Component Options →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

// Solar system domestic content calculator
function calculateSolarNeeds(formData) {
  const { monthlyBill, monthlyKwh, location, roofSize, panelManufacturer, inverterType, projectSize } = formData
  
  // State-specific solar irradiance
  const locationData = {
    california: { sunHours: 5.5, electricityRate: 0.28 },
    texas: { sunHours: 4.8, electricityRate: 0.12 },
    florida: { sunHours: 4.5, electricityRate: 0.13 },
    arizona: { sunHours: 6.0, electricityRate: 0.13 },
    nevada: { sunHours: 5.8, electricityRate: 0.14 },
    colorado: { sunHours: 5.0, electricityRate: 0.13 },
    'north-carolina': { sunHours: 4.7, electricityRate: 0.11 },
    'new-york': { sunHours: 3.8, electricityRate: 0.18 }
  }
  
  const locationInfo = locationData[location] || { sunHours: 4.5, electricityRate: 0.13 }
  const electricityRate = parseFloat(monthlyBill) / parseFloat(monthlyKwh) || locationInfo.electricityRate
  
  // Calculate system size needed
  const dailyKwh = parseFloat(monthlyKwh) / 30
  const systemSizeNeeded = (dailyKwh / locationInfo.sunHours) * 1.2 // 20% buffer
  const maxSystemSize = parseFloat(roofSize) / 20 // 20 sq ft per kW
  const systemSize = Math.min(systemSizeNeeded, maxSystemSize)
  const finalSystemSize = Math.round(systemSize * 10) / 10
  
  // Calculate domestic content percentages by component
  const componentBreakdown = calculateDomesticContent(panelManufacturer, inverterType, projectSize, finalSystemSize)
  
  // System cost calculation
  const baseCostPerWatt = componentBreakdown.averageCostPerWatt
  const systemCost = finalSystemSize * 1000 * baseCostPerWatt
  
  // Annual production and savings
  const annualProduction = finalSystemSize * locationInfo.sunHours * 365
  const annualSavingsCapacity = annualProduction * electricityRate
  const maxAnnualSavings = parseFloat(monthlyBill) * 12
  const annualSavings = Math.min(annualSavingsCapacity, maxAnnualSavings)
  
  return {
    systemSize: finalSystemSize,
    estimatedCost: Math.round(systemCost),
    annualSavings: Math.round(annualSavings),
    annualProduction: Math.round(annualProduction),
    roofUtilization: Math.round((finalSystemSize * 20 / parseFloat(roofSize)) * 100),
    domesticContent: componentBreakdown,
    locationInfo: locationInfo
  }
}

// Calculate domestic vs foreign content breakdown
function calculateDomesticContent(panelManufacturer, inverterType, projectSize, systemSize) {
  // Component cost breakdown (percentage of total system cost)
  const componentCosts = {
    panels: 0.40,      // 40% of system cost
    inverters: 0.15,   // 15% of system cost
    mounting: 0.08,    // 8% of system cost
    wiring: 0.05,      // 5% of system cost
    labor: 0.25,       // 25% of system cost (always domestic)
    permits: 0.07      // 7% of system cost (always domestic)
  }
  
  // Domestic content percentages by component type
  const domesticPercentages = {
    panels: {
      domestic: 95,  // US made panels are 95% domestic content
      foreign: 5,    // Foreign panels are 5% domestic (final assembly, some components)
      mixed: 60      // Mixed approach averages to 60% domestic
    },
    inverters: {
      string: 45,        // String inverters: 45% domestic (some US assembly)
      micro: 75,         // Microinverters: 75% domestic (Enphase is US-based)
      'power-optimizer': 40  // Power optimizers: 40% domestic
    },
    mounting: {
      standard: 85,  // Standard mounting: 85% domestic (US steel/aluminum)
      premium: 70    // Premium mounting: 70% domestic (some imported components)
    },
    wiring: 90,        // Electrical components: 90% domestic
    labor: 100,        // Labor: 100% domestic
    permits: 100       // Permits/inspections: 100% domestic
  }
  
  // Calculate weighted domestic content
  let totalDomesticContent = 0
  let totalForeignContent = 0
  let totalCost = 0
  
  const breakdown = {}
  
  // Panels
  const panelDomesticPercent = domesticPercentages.panels[panelManufacturer]
  const panelCost = componentCosts.panels
  const panelDomesticCost = panelCost * (panelDomesticPercent / 100)
  const panelForeignCost = panelCost * ((100 - panelDomesticPercent) / 100)
  
  breakdown.panels = {
    cost: panelCost,
    domesticPercent: panelDomesticPercent,
    domesticCost: panelDomesticCost,
    foreignCost: panelForeignCost
  }
  
  // Inverters
  const inverterDomesticPercent = domesticPercentages.inverters[inverterType]
  const inverterCost = componentCosts.inverters
  const inverterDomesticCost = inverterCost * (inverterDomesticPercent / 100)
  const inverterForeignCost = inverterCost * ((100 - inverterDomesticPercent) / 100)
  
  breakdown.inverters = {
    cost: inverterCost,
    domesticPercent: inverterDomesticPercent,
    domesticCost: inverterDomesticCost,
    foreignCost: inverterForeignCost
  }
  
  // Mounting (assume standard for now)
  const mountingDomesticPercent = domesticPercentages.mounting.standard
  const mountingCost = componentCosts.mounting
  const mountingDomesticCost = mountingCost * (mountingDomesticPercent / 100)
  const mountingForeignCost = mountingCost * ((100 - mountingDomesticPercent) / 100)
  
  breakdown.mounting = {
    cost: mountingCost,
    domesticPercent: mountingDomesticPercent,
    domesticCost: mountingDomesticCost,
    foreignCost: mountingForeignCost
  }
  
  // Wiring
  const wiringDomesticPercent = domesticPercentages.wiring
  const wiringCost = componentCosts.wiring
  const wiringDomesticCost = wiringCost * (wiringDomesticPercent / 100)
  const wiringForeignCost = wiringCost * ((100 - wiringDomesticPercent) / 100)
  
  breakdown.wiring = {
    cost: wiringCost,
    domesticPercent: wiringDomesticPercent,
    domesticCost: wiringDomesticCost,
    foreignCost: wiringForeignCost
  }
  
  // Labor (always 100% domestic)
  breakdown.labor = {
    cost: componentCosts.labor,
    domesticPercent: 100,
    domesticCost: componentCosts.labor,
    foreignCost: 0
  }
  
  // Permits (always 100% domestic)
  breakdown.permits = {
    cost: componentCosts.permits,
    domesticPercent: 100,
    domesticCost: componentCosts.permits,
    foreignCost: 0
  }
  
  // Calculate totals
  totalDomesticContent = Object.values(breakdown).reduce((sum, component) => sum + component.domesticCost, 0)
  totalForeignContent = Object.values(breakdown).reduce((sum, component) => sum + component.foreignCost, 0)
  totalCost = totalDomesticContent + totalForeignContent
  
  const overallDomesticPercent = Math.round((totalDomesticContent / totalCost) * 100)
  const overallForeignPercent = Math.round((totalForeignContent / totalCost) * 100)
  
  // Cost per watt varies by domestic content
  const averageCostPerWatt = panelManufacturer === 'domestic' ? 4.20 : 
                            panelManufacturer === 'foreign' ? 3.10 : 3.65
  
  // Buy America Act compliance (requires 55% domestic content for federal projects)
  const buyAmericaCompliant = overallDomesticPercent >= 55
  
  return {
    breakdown,
    totalDomesticPercent: overallDomesticPercent,
    totalForeignPercent: overallForeignPercent,
    totalDomesticCost: totalDomesticContent,
    totalForeignCost: totalForeignContent,
    averageCostPerWatt,
    buyAmericaCompliant,
    complianceNote: buyAmericaCompliant ? 
      'Eligible for federal projects and additional incentives' : 
      'Not eligible for federal projects requiring Buy America compliance'
  }
}
