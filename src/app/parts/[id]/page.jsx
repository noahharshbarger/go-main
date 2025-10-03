import Link from 'next/link'
import { notFound } from 'next/navigation'

const solarParts = [
  {
    id: 'SPW-400-D',
    name: 'SunPower Maxeon 3 400W',
    brand: 'SunPower',
    partType: 'Solar Panel',
    price: 299,
    domestic: true,
    weight: 42.3,
    manufacturer: 'USA - Oregon',
    efficiency: '22.6%',
    warranty: '25 years'
  },
  {
    id: 'JINKO-350-ND',
    name: 'JinkoSolar Tiger Pro 350W',
    brand: 'JinkoSolar',
    partType: 'Solar Panel',
    price: 189,
    domestic: false,
    weight: 38.7,
    manufacturer: 'China - Jiangxi',
    efficiency: '20.78%',
    warranty: '12 years'
  },
  {
    id: 'SE-5K-D',
    name: 'SolarEdge HD-Wave 5000',
    brand: 'SolarEdge',
    partType: 'Inverter',
    price: 1299,
    domestic: true,
    weight: 28.2,
    manufacturer: 'USA - New Hampshire',
    efficiency: '99%',
    warranty: '12 years'
  },
  {
    id: 'HUAWEI-8K-ND',
    name: 'Huawei SUN2000-8KTL',
    brand: 'Huawei',
    partType: 'Inverter',
    price: 1899,
    domestic: false,
    weight: 26.5,
    manufacturer: 'China - Shenzhen',
    efficiency: '98.4%',
    warranty: '10 years'
  },
  {
    id: 'TESLA-13.5-ND',
    name: 'Tesla Powerwall 2',
    brand: 'Tesla',
    partType: 'Battery',
    price: 7500,
    domestic: false,
    weight: 276,
    manufacturer: 'China - Shanghai',
    capacity: '13.5 kWh',
    warranty: '10 years'
  },
  {
    id: 'ENPHASE-IQ8-D',
    name: 'Enphase IQ8+ Microinverter',
    brand: 'Enphase',
    partType: 'Microinverter',
    price: 149,
    domestic: true,
    weight: 1.5,
    manufacturer: 'USA - California',
    efficiency: '97.5%',
    warranty: '25 years'
  }
]

export async function generateMetadata({ params}) {
    const part = solarParts.find(p => p.id === params.id)

    if (!part) {
        return { title: 'Part Not Found' }
    }

    return {
        title: `${part.name}`,
        description: `${part.brand} ${part.name} - ${part.partType} from ${part.manufacturer}. Price: $${part.price}`
    }
}

export default function PartDetail({ params }) {
    const part = solarParts.find(p => p.id === params.id)

    if (!part) {
        return { title: 'Part Not Found' }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="container mx-auto px-4 py-15">
                <nav className="mb-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-blue-600">Home</Link>
                        <span>➡️</span>
                        <Link href="/calculator" className="hover:text-blue-600">Calculator</Link>
                        <span>➡️</span>
                        <span className="text-gray-900 font-medium">{part.name}</span>
                    </div>
                </nav>

                <div className="rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{part.name}</h1>
                                <p className="text-blue-100">SKU: {part.id}</p>
                                <p className="text-blue-100">by {part.brand}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold mb-2">${part.price.toLocaleString()}</div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  part.domestic 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'}
                                 }`}>`
                                 {part.domestic ? 'Domestic Manufacturing' : 'Foreign Manufacturing'}
                                </span>
                            </div>
                        </div>
                        </div>
                        <div className="p-8">
                            <div className="grid gap-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="font-medium">Part Type:</span>
                                            <span>{part.partType}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="font-medium">Weight:</span>
                                            <span>{part.weight} lbs</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="font-medium">Warranty:</span>
                                            <span>{part.warranty}</span>
                                        </div>
                                        {part.efficiency && (
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="font-medium">Efficiency:</span>
                                                <span>{part.efficiency}</span>
                                            </div>
                                        )}
                                        {part.capacity && (
                                            <div className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="font-medium">Capacity:</span>
                                                <span>{part.capacity}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Manufacturing Information</h2>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="font-medium">Brand:</span>
                                            <span>{part.brand}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="font-medium">Manufacturing Location</span>
                                            <span>{part.manufacturer}</span>
                                        </div>
                                        <div className="flex justify-between py-2 border-b border-gray-100">
                                            <span className="font-medium">Content Classification:</span>
                                            <span className={`font-medium ${
                                              part.domestic ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {part.domestic ? 'Domestic Content' : 'Foreign Content'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-8 border-t border-gray-200 flex gap-4">
                                <Link
                                    href="/calculator"
                                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                                    >
                                        ⬅️ Back to Search
                                    </Link>
                                    <Link
                                        href="/compare"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                        >
                                        Compare Financing ➡️
                                        </Link>
                            </div>
                        </div>
                    </div>
            </div>
        </main>
    )
}
