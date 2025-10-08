'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ApiDemo() {
    const [selectedRegion, setSelectedRegion] = useState('california')
    const [pricingData, setPricingData] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)

    const regions = [
        { value: 'california', label: 'California' },
        { value: 'texas', label: 'Texas' },
        { value: 'florida', label: 'Florida' },
        { value: 'new_york', label: 'New York' }
    ]

    const fetchData = async (region) => {
        setLoading(true)
        
        // Teaching: Show the data flow in console
        console.log('🎯 FRONTEND: User selected region:', region)
        console.log('📡 FRONTEND: Making API calls to backend...')
        
        try {
            const [pricingResponse, weatherResponse] = await Promise.all([
                fetch(`/api/solar-pricing?region=${region}`),
                fetch(`/api/installation-conditions?region=${region}`)
            ])

            console.log('📨 FRONTEND: Received responses from backend')
            
            const pricing = await pricingResponse.json()
            const weather = await weatherResponse.json()

            console.log('📊 FRONTEND: Processed pricing data:', pricing.data)
            console.log('🌤️ FRONTEND: Processed weather data:', weather.data)

            if (pricing.success) setPricingData(pricing.data)
            if (weather.success) setWeatherData(weather.data)

        } catch (error) {
            console.error('❌ FRONTEND: Error fetching data:', error)
        } finally {
            setLoading(false)
            console.log('✅ FRONTEND: Data flow complete')
        }
        }

        useEffect(() => {
            fetchData(selectedRegion)
        }, [selectedRegion])

        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">

                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold">API Demo</h1>
                            <div className="flex gap-4">
                                <Link href="/data-flow-demo" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                    📊 See Data Flow
                                </Link>
                                <Link href="/parts-picker" className="text-blue-600 hover:underline">
                                    Back to Parts Picker
                                </Link>
                            </div>
                        </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6 mb-6">
                            <h2 className="text-2xl font-semibold mb-4">Select Region</h2>
                            <div className="grid grid-cols-4 gap-4">
                                {regions.map((region) => (
                                    <button
                                        key={region.value}
                                        onClick={() => setSelectedRegion(region.value)}
                                        className={`p-3 rounded-lg border ${
                                            selectedRegion === region.value
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        >
                                            {region.label}
                                        </button>
                                ))}
                            </div>
                    </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p>Loading data...</p>
                    </div>
                    ) : (
                        <div className="max-w-4xl mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold mb-4">Pricing Data</h3>
                                {pricingData && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-green-50 p-4 rounded-lg text-center">
                                                <div className="text-2xl font-bold text-green-700">
                                                    ${pricingData.pricing?.residential?.pricePerWatt?.toFixed(2) || '0.00'}/W
                                                </div>
                                                <div className="text-sm text-green-600">Residential</div>
                                                </div>
                                                <div className="bg-blue-50 p-4 rounded-lg text-center">
                                                    <div className="text-2xl font-bold text-blue-700">
                                                        ${pricingData.pricing?.commercial?.pricePerWatt?.toFixed(2) || '0.00'}/W
                                                    </div>
                                                    <div className="text-sm text-blue-600">Commercial</div>
                                                    </div>
                                                    </div>
                                                    </div>
                                )}
                                </div>
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-semibold mb-4">Installation Conditions</h3>
                                    {weatherData && (
                                        <div className="space-y-4">
                                            <div className="text-center">
                                                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-2xl font-bold text-white ${
                                                    weatherData.installation.score >= 80 ? 'bg-green-500' :
                                                    weatherData.installation.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}>
                                                    {weatherData.installation.score}
                                                    </div>
                                                    <div className="mt-2">
                                                        <div className="font-medium">Installation Score</div>
                                                        <div className="text-sm text-gray-600">{weatherData.installation.recommendation}</div>
                                                        </div>
                                                        </div>
                                                        <div className="bg-gray-50 p-4 rounded">
                                                            <div className="text-sm text-gray-600 mb-2">
                                                                📍 Real-time data from {weatherData.installation.city}
                                                            </div>
                                                            <div className="flex justify-between mb-2">
                                                                <span>Temperature:</span>
                                                                <span className="font-medium">{weatherData.current.temperature}°F</span>
                                                                </div>
                                                                <div className="flex justify-between mb-2">
                                                                    <span>Conditions:</span>
                                                                    <span className="font-medium">{weatherData.current.conditions}</span>
                                                                    </div>
                                                                    <div className="flex justify-between mb-2">
                                                                        <span>Wind Speed:</span>
                                                                        <span className="font-medium">{weatherData.current.windSpeed} mph</span>
                                                                        </div>
                                                                        <div className="flex justify-between mb-2">
                                                                            <span>Humidity:</span>
                                                                            <span className="font-medium">{weatherData.current.humidity}%</span>
                                                                            </div>
                                                                            <div className="flex justify-between">
                                                                                <span>Cloud Cover:</span>
                                                                                <span className="font-medium">{weatherData.current.cloudCover}%</span>
                                                                                </div>
                                                                                </div>
                                                                    </div>
                                    )}
                                    </div>
                                    </div>
                            </div>
                    )}
        </div>
        )
}