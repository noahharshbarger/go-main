import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Solar Panel Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Compare domestic and foreign solar panels from different companies. 
            Learn about costs, savings, and make informed decisions for your solar installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/calculator"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Calculator
            </Link>
            <Link 
              href="/compare"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
            >
              Compare Companies
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-blue-600 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-3">Smart Calculations</h3>
            <p className="text-gray-600">
              Get accurate solar panel size recommendations based on your energy usage and location.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-green-600 text-3xl mb-4">🏭</div>
            <h3 className="text-xl font-semibold mb-3">Company Comparison</h3>
            <p className="text-gray-600">
              Compare domestic vs foreign solar panel manufacturers and their pricing.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-purple-600 text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-3">Savings Analysis</h3>
            <p className="text-gray-600">
              See your potential savings, payback period, and return on investment.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Enter Usage</h4>
              <p className="text-sm text-gray-600">Input your monthly electric bill and kWh usage</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Choose Location</h4>
              <p className="text-sm text-gray-600">Select your state for solar irradiance data</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Compare Options</h4>
              <p className="text-sm text-gray-600">See domestic vs foreign panel companies</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 text-xl font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Get Results</h4>
              <p className="text-sm text-gray-600">View costs, savings, and recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}