'use client'

import { useState } from 'react'

export default function DataFlowDemo() {
  const [logs, setLogs] = useState([])
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, { message, type, timestamp }])
  }

  const clearLogs = () => {
    setLogs([])
    setWeatherData(null)
  }

  const demonstrateDataFlow = async (region) => {
    setLoading(true)
    clearLogs()
    
    // Step 1: Frontend initiates
    addLog(`🎯 FRONTEND: User clicked "${region}" button`, 'frontend')
    addLog('📡 FRONTEND: Making API call to backend...', 'frontend')
    
    try {
      // Step 2: Call backend
      const response = await fetch(`/api/installation-conditions?region=${region}`)
      
      addLog('📨 FRONTEND: Received response from backend', 'frontend')
      
      const result = await response.json()
      
      if (result.success) {
        addLog('✅ FRONTEND: Successfully parsed data', 'frontend')
        addLog(`📊 FRONTEND: Got weather data for ${result.data.installation.city}`, 'frontend')
        setWeatherData(result.data)
      } else {
        addLog('❌ FRONTEND: Backend returned error', 'error')
      }
      
    } catch (error) {
      addLog(`❌ FRONTEND: Network error - ${error.message}`, 'error')
    } finally {
      setLoading(false)
      addLog('🏁 FRONTEND: Data flow complete', 'frontend')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Backend-to-Frontend Data Flow Demo</h1>
        <p className="text-gray-600 mb-8">
          Click a region below and watch the console + logs to see how data flows from frontend → backend → external API → backend → frontend
        </p>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">1. Trigger Data Flow</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {['california', 'texas', 'florida', 'new_york'].map(region => (
              <button
                key={region}
                onClick={() => demonstrateDataFlow(region)}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 capitalize"
              >
                {region.replace('_', ' ')}
              </button>
            ))}
          </div>
          <button
            onClick={clearLogs}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Logs
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Data Flow Logs */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">2. Data Flow Logs</h2>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500">Click a region to see the data flow...</p>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className={`mb-2 ${
                    log.type === 'frontend' ? 'text-blue-400' :
                    log.type === 'error' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    <span className="text-gray-400">[{log.timestamp}]</span> {log.message}
                  </div>
                ))
              )}
              {loading && (
                <div className="text-yellow-400 animate-pulse">
                  🔄 Processing... (Check browser console for backend logs)
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              💡 Open browser DevTools → Console to see backend API logs
            </p>
          </div>

          {/* Result Data */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">3. Final Result Data</h2>
            {weatherData ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h3 className="font-semibold text-blue-900">Current Conditions</h3>
                  <p>🌡️ Temperature: {weatherData.current.temperature}°F</p>
                  <p>☁️ Conditions: {weatherData.current.conditions}</p>
                  <p>💨 Wind: {weatherData.current.windSpeed} mph</p>
                  <p>☁️ Cloud Cover: {weatherData.current.cloudCover}%</p>
                  <p>💧 Humidity: {weatherData.current.humidity}%</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded">
                  <h3 className="font-semibold text-green-900">Installation Assessment</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      weatherData.installation.score >= 80 ? 'bg-green-500' :
                      weatherData.installation.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {weatherData.installation.score}
                    </div>
                    <div>
                      <p className="font-medium">Score: {weatherData.installation.score}/100</p>
                      <p>Recommendation: {weatherData.installation.recommendation}</p>
                      <p>Location: {weatherData.installation.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No data yet. Click a region above to see results.</p>
            )}
          </div>
        </div>

        {/* Teaching Points */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">What Just Happened?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-blue-900">Frontend (Your React App)</h3>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• User clicks button</li>
                <li>• Makes fetch() call to YOUR API</li>
                <li>• Receives processed data</li>
                <li>• Updates UI with results</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-green-900">Backend (Your NextJS API)</h3>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Receives frontend request</li>
                <li>• Calls OpenWeather API</li>
                <li>• Processes raw weather data</li>
                <li>• Adds business logic (scoring)</li>
                <li>• Returns clean data to frontend</li>
              </ul>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-purple-900">External API (OpenWeather)</h3>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Provides raw weather data</li>
                <li>• Uses your secret API key</li>
                <li>• Returns JSON response</li>
                <li>• Never talks directly to frontend</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
