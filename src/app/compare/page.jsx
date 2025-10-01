'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Compare() {
  // 🎓 Teaching: useSearchParams hook for URL parameters
  const searchParams = useSearchParams()

  // Sample companies with domestic content percentages
  const companies = [
    {
      name: 'First Solar',
      country: 'USA',
      type: 'Domestic Manufacturer',
      pricePerWatt: 4.2,
      domesticContent: 85
    },
    {
      name: 'SunPower',
      country: 'USA', 
      type: 'Domestic Manufacturer',
      pricePerWatt: 4.5,
      domesticContent: 75
    },
    {
      name: 'JinkoSolar',
      country: 'China',
      type: 'Foreign Manufacturer',
      pricePerWatt: 2.8,
      domesticContent: 15
    },
    {
      name: 'Trina Solar',
      country: 'China',
      type: 'Foreign Manufacturer', 
      pricePerWatt: 2.6,
      domesticContent: 10
    }
  ]

  // 🎓 Teaching: Calculate mixed domestic/foreign content percentages
  const calculateSystemComposition = (domesticCompany, foreignCompany, systemSize) => {
    // System component breakdown (percentage of total system cost)
    const components = {
      panels: 0.45,        // 45% - Panels (main differentiator)
      inverters: 0.15,     // 15% - Inverters  
      mounting: 0.08,      // 8% - Mounting hardware
      wiring: 0.05,        // 5% - Electrical components
      labor: 0.20,         // 20% - Installation labor (always domestic)
      permits: 0.07        // 7% - Permits/inspection (always domestic)
    }

    // Component domestic content percentages
    const domesticContent = {
      panels: {
        domestic: domesticCompany.domesticContent,
        foreign: foreignCompany.domesticContent
      },
      inverters: 60,       // Inverters are typically 60% domestic
      mounting: 85,        // Mounting hardware mostly domestic (US steel/aluminum)
      wiring: 75,          // Electrical components 75% domestic
      labor: 100,          // Labor always 100% domestic
      permits: 100         // Permits always 100% domestic
    }

    // Calculate different scenarios
    const scenarios = {
      allDomestic: calculateScenario('domestic', domesticCompany, components, domesticContent, systemSize),
      allForeign: calculateScenario('foreign', foreignCompany, components, domesticContent, systemSize),
      mixed: calculateScenario('mixed', { domesticCompany, foreignCompany }, components, domesticContent, systemSize)
    }

    return scenarios
  }

  const calculateScenario = (type, companies, components, domesticContent, systemSize) => {
    const systemWatts = systemSize * 1000
    let totalCost = 0
    let totalDomesticContent = 0
    let componentBreakdown = {}

    // Calculate each component
    Object.entries(components).forEach(([component, percentage]) => {
      let componentCost = 0
      let componentDomesticPercent = 0

      if (component === 'panels') {
        if (type === 'domestic') {
          componentCost = systemWatts * companies.pricePerWatt * percentage
          componentDomesticPercent = domesticContent.panels.domestic
        } else if (type === 'foreign') {
          componentCost = systemWatts * companies.pricePerWatt * percentage
          // Add tariffs for foreign panels
          const tariffCost = componentCost * 0.25
          componentCost += tariffCost
          componentDomesticPercent = domesticContent.panels.foreign
        } else { // mixed
          // 60% domestic panels, 40% foreign panels
          const domesticPanelCost = systemWatts * companies.domesticCompany.pricePerWatt * percentage * 0.6
          const foreignPanelCost = systemWatts * companies.foreignCompany.pricePerWatt * percentage * 0.4
          const foreignTariff = foreignPanelCost * 0.25
          componentCost = domesticPanelCost + foreignPanelCost + foreignTariff
          componentDomesticPercent = (domesticContent.panels.domestic * 0.6) + (domesticContent.panels.foreign * 0.4)
        }
      } else {
        // Other components use average pricing
        const avgPrice = type === 'domestic' ? 4.0 : type === 'foreign' ? 3.0 : 3.5
        componentCost = systemWatts * avgPrice * percentage
        componentDomesticPercent = domesticContent[component]
      }

      componentBreakdown[component] = {
        cost: Math.round(componentCost),
        domesticPercent: Math.round(componentDomesticPercent),
        domesticCost: Math.round(componentCost * (componentDomesticPercent / 100)),
        foreignCost: Math.round(componentCost * ((100 - componentDomesticPercent) / 100))
      }

      totalCost += componentCost
      totalDomesticContent += componentCost * (componentDomesticPercent / 100)
    })

    const overallDomesticPercent = Math.round((totalDomesticContent / totalCost) * 100)
    const overallForeignPercent = 100 - overallDomesticPercent

    return {
      totalCost: Math.round(totalCost),
      domesticPercent: overallDomesticPercent,
      foreignPercent: overallForeignPercent,
      domesticCost: Math.round(totalDomesticContent),
      foreignCost: Math.round(totalCost - totalDomesticContent),
      componentBreakdown,
      buyAmericaCompliant: overallDomesticPercent >= 55
    }
  }

  const systemSize = searchParams.get('size') || 10
  
  // 🎓 Teaching: Find domestic and foreign companies for comparison
  const domesticCompany = companies.find(c => c.country === 'USA')
  const foreignCompany = companies.find(c => c.country === 'China')
  
  if (!domesticCompany || !foreignCompany) {
    return <div>Required companies not found</div>
  }
  
  // 🎓 Teaching: Complex calculation with multiple scenarios
  const scenarios = calculateSystemComposition(domesticCompany, foreignCompany, systemSize)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Solar System Domestic vs Foreign Content Analysis
            </h1>
            <p className="text-gray-600">
              System Size: {systemSize} kW | Compare domestic content percentages across different scenarios
            </p>
          </div>

          {/* Scenario Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* All Domestic Scenario */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-green-800">All Domestic</h3>
                <p className="text-sm text-green-600">Maximum domestic content</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Domestic Content</span>
                    <span className="text-lg font-bold text-green-600">{scenarios.allDomestic.domesticPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full" 
                      style={{width: `${scenarios.allDomestic.domesticPercent}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">${scenarios.allDomestic.totalCost.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Cost</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-green-600">${scenarios.allDomestic.domesticCost.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Domestic</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-red-600">${scenarios.allDomestic.foreignCost.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Foreign</p>
                  </div>
                </div>
                
                <div className={`text-center text-xs font-medium px-2 py-1 rounded ${scenarios.allDomestic.buyAmericaCompliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {scenarios.allDomestic.buyAmericaCompliant ? '✓ Buy America Compliant' : '✗ Not Buy America Compliant'}
                </div>
              </div>
            </div>

            {/* Mixed Scenario */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl p-6 border border-blue-200">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-blue-800">Mixed System</h3>
                <p className="text-sm text-blue-600">60% domestic / 40% foreign panels</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Domestic Content</span>
                    <span className="text-lg font-bold text-blue-600">{scenarios.mixed.domesticPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full" 
                      style={{width: `${scenarios.mixed.domesticPercent}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">${scenarios.mixed.totalCost.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Cost</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-green-600">${scenarios.mixed.domesticCost.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Domestic</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-red-600">${scenarios.mixed.foreignCost.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Foreign</p>
                  </div>
                </div>
                
                <div className={`text-center text-xs font-medium px-2 py-1 rounded ${scenarios.mixed.buyAmericaCompliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {scenarios.mixed.buyAmericaCompliant ? '✓ Buy America Compliant' : '✗ Not Buy America Compliant'}
                </div>
              </div>
            </div>

            {/* All Foreign Scenario */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-red-800">All Foreign</h3>
                <p className="text-sm text-red-600">Minimum domestic content</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Domestic Content</span>
                    <span className="text-lg font-bold text-red-600">{scenarios.allForeign.domesticPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-red-500 h-3 rounded-full" 
                      style={{width: `${scenarios.allForeign.domesticPercent}%`}}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">${scenarios.allForeign.totalCost.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Cost</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-green-600">${scenarios.allForeign.domesticCost.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Domestic</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-red-600">${scenarios.allForeign.foreignCost.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Foreign</p>
                  </div>
                </div>
                
                <div className={`text-center text-xs font-medium px-2 py-1 rounded ${scenarios.allForeign.buyAmericaCompliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {scenarios.allForeign.buyAmericaCompliant ? '✓ Buy America Compliant' : '✗ Not Buy America Compliant'}
                </div>
              </div>
            </div>
          </div>

          {/* Component Breakdown for Mixed Scenario */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Mixed System Component Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(scenarios.mixed.componentBreakdown).map(([component, data]) => (
                <div key={component} className="bg-white rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900 capitalize">{component}</h4>
                    <span className="text-sm font-medium text-blue-600">{data.domesticPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{width: `${data.domesticPercent}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Cost: ${data.cost.toLocaleString()}</span>
                    <span>Domestic: ${data.domesticCost.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next.js Teaching Section */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">🎓 Next.js Concepts Demonstrated</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">React Hooks & State:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• useSearchParams() for URL parameters</li>
                  <li>• Complex state calculations</li>
                  <li>• Array methods (find, map, entries)</li>
                  <li>• Object destructuring</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Next.js Features:</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Client Components ('use client')</li>
                  <li>• Link component navigation</li>
                  <li>• Dynamic conditional rendering</li>
                  <li>• Responsive grid layouts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link 
              href={`/calculator`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Back to Calculator
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
