import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'

// Font optimization with Next.js
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Solar Panel Calculator',
  description: 'Compare domestic and foreign solar panels - Learn Next.js fundamentals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Next.js automatically injects metadata from the metadata export */}
        {/* Additional head elements can be added here */}
      </head>
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100`}>
        {/* 
          Global Layout Structure:
          - This layout wraps ALL pages in the application
          - Perfect for navigation, footers, providers, analytics
          - Shared UI components that appear on every page
        */}
        
        {/* Use existing Navbar component from boilerplate */}
        <header>
          {/* We'll integrate the existing Navbar component here */}
          {/* For now, using a simple header that matches the existing design */}
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">⚡</span>
                    </div>
                    <h1 className="ml-3 text-xl font-bold text-gray-900">
                      Solar Calculator Learning Platform
                    </h1>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center space-x-6">
                  <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                    Home
                  </Link>
                  <Link href="/calculator" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                    Calculator
                  </Link>
                  <Link href="/compare" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                    Compare
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Application Content */}
        <main className="flex-1 min-h-screen">
          {/* 
            Children will be rendered here:
            - Could be pages from app/page.jsx
            - Could be nested layouts from app/(dashboard)/layout.jsx
            - Could be route groups from app/(marketing)/about/page.jsx
          */}
          {children}
        </main>

        {/* Global Footer with Next.js Learning Resources */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-semibold mb-4">Next.js Concepts Covered</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                  <div>• App Router</div>
                  <div>• Server Components</div>
                  <div>• Client Components</div>
                  <div>• Nested Layouts</div>
                  <div>• Route Groups</div>
                  <div>• Dynamic Routes</div>
                  <div>• API Routes</div>
                  <div>• Server Actions</div>
                  <div>• Image Optimization</div>
                  <div>• Font Optimization</div>
                  <div>• Metadata API</div>
                  <div>• Loading UI</div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Learning Sections</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• React Fundamentals</li>
                  <li>• Next.js Basics</li>
                  <li>• Routing & Navigation</li>
                  <li>• Data Fetching</li>
                  <li>• Deployment</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Next.js Docs</li>
                  <li>• React Docs</li>
                  <li>• Vercel Platform</li>
                  <li>• TypeScript Guide</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-400">
                Next.js 15 Teaching Platform - Built with App Router, Server Components, and ❤️
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}