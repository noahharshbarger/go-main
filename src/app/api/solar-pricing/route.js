import { NextResponse } from 'next/server'

const pricingData = {
    california: { residential: 3.45, commercial: 3.05 },
    texas: { residential: 2.95, commercial: 2.55 },
    florida: { residential: 3.15, commercial: 2.75 },
    new_york: { residential: 3.85, commercial: 3.25 }
}

const trends = [
    { component: 'Solar Panels', direction: 'down', change: '5.2%' },
    { component: 'Installation', direction: 'up', change: '2.1%' },
    { component: 'Permits', direction: 'down', change: '1.5%' }
]

const incentives = [
    { name: 'Federal Tax Credit', description: '30% federal tax credit' },
    { name: 'State Rebates', description: 'Varies by state' }
]

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const region = searchParams.get('region') || 'california'

        const regionData = pricingData[region] || pricingData.california

        return NextResponse.json({
            success: true,
            data: {
                pricing: {
                    residential: { pricePerWatt: regionData.residential },
                    commercial: { pricePerWatt: regionData.commercial }
                },
                trends,
                incentives
            }
        })
    } catch (error) {
        return NextResponse.json(
        { success: false, error: 'Failed to fetch pricing' },
       { status: 500 }
        )
    }
}