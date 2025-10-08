import { NextResponse } from 'next/server'

// Teaching: Regional coordinates for weather lookup
const regionCoordinates = {
    california: { lat: 34.0522, lon: -118.2437, city: 'Los Angeles' },
    texas: { lat: 29.7604, lon: -95.3698, city: 'Houston' },
    florida: { lat: 25.7617, lon: -80.1918, city: 'Miami' },
    new_york: { lat: 40.7128, lon: -74.0060, city: 'New York' }
}

// Teaching: Calculate installation score based on weather
function calculateInstallationScore(weatherData) {
    let score = 100
    const temp = weatherData.main.temp
    const windSpeed = weatherData.wind.speed
    const cloudCover = weatherData.clouds.all
    
    // Temperature factors
    if (temp > 95) score -= 20 // Too hot for installation
    if (temp < 35) score -= 30 // Too cold
    
    // Wind factors  
    if (windSpeed > 15) score -= 25 // High wind dangerous
    if (windSpeed > 25) score -= 40 // Very high wind
    
    // Cloud cover (affects solar production)
    if (cloudCover > 80) score -= 15
    
    return Math.max(0, Math.min(100, Math.round(score)))
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const region = searchParams.get('region') || 'california'
        
        // Teaching: Log the backend data flow
        console.log('🔧 BACKEND: Received request for region:', region)
        
        const coords = regionCoordinates[region] || regionCoordinates.california
        const apiKey = process.env.OPENWEATHER_API_KEY
        
        console.log('🌐 BACKEND: Calling OpenWeather API for coordinates:', coords)
        
        if (!apiKey) {
            throw new Error('OpenWeather API key not configured')
        }
        
        // Teaching: Fetch real weather data from OpenWeather API
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=imperial`
        )
        
        if (!weatherResponse.ok) {
            throw new Error('Failed to fetch weather data')
        }
        
        const weatherData = await weatherResponse.json()
        console.log('📡 BACKEND: Received external API data:', {
            temp: weatherData.main.temp,
            conditions: weatherData.weather[0].main,
            wind: weatherData.wind.speed,
            clouds: weatherData.clouds.all
        })
        
        const installationScore = calculateInstallationScore(weatherData)
        console.log('🧮 BACKEND: Calculated installation score:', installationScore)
        
        const processedData = {
            current: {
                temperature: Math.round(weatherData.main.temp),
                conditions: weatherData.weather[0].main,
                description: weatherData.weather[0].description,
                humidity: weatherData.main.humidity,
                windSpeed: Math.round(weatherData.wind.speed),
                cloudCover: weatherData.clouds.all
            },
            installation: {
                score: installationScore,
                recommendation: installationScore >= 80 ? 'Excellent' : 
                               installationScore >= 60 ? 'Good' : 
                               installationScore >= 40 ? 'Caution' : 'Poor',
                city: coords.city
            }
        }
        
        console.log('📤 BACKEND: Sending processed data to frontend:', processedData)
        
        return NextResponse.json({
            success: true,
            data: processedData
        })
    } catch (error) {
        console.error('❌ BACKEND: Error in data flow:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch weather data' },
            { status: 500 }
        )
    }
}


