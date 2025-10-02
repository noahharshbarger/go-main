export default function Calculator() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Parts Analysis Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Coming Soon - Solar parts lookup and analysis tool
          </p>
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 max-w-md mx-auto">
            <div className="text-6xl mb-4">🔧</div>
            <h2 className="text-xl font-semibold mb-4">Features Coming:</h2>
            <ul className="text-left text-gray-600 space-y-2">
              <li>• Search parts by SKU, brand, or type</li>
              <li>• Manufacturing origin tracking</li>
              <li>• Weight and pricing analysis</li>
              <li>• Domestic vs foreign content breakdown</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
