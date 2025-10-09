'use client'

import { useState } from 'react'

export default function SignInSolution() {
  // Step 2: State management
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Step 3: Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  // Step 4: Form validation
  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }
    return true
  }

  // Step 5: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      // Simulate API call
      console.log('📤 Submitting form data:', formData)
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate success
      console.log('✅ Sign in successful!')
      setSuccess(true)
      
      // Reset form
      setTimeout(() => {
        setFormData({ email: '', password: '' })
        setSuccess(false)
      }, 3000)
      
    } catch (err) {
      console.error('❌ Sign in failed:', err)
      setError('Sign in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Success!</h1>
          <p className="text-gray-600 mb-6">You've successfully signed in.</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700">
              Great job completing the workshop! Check the console to see the data flow.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-600">Complete Solution</p>
        </div>

        {/* Success Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-green-800 mb-2">✅ Complete Solution</h3>
          <p className="text-sm text-green-700">
            This shows the finished form with all features implemented.
            Open the console to see the data flow!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              placeholder="Enter your password"
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Implementation Notes */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">🔧 Implementation Features:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Controlled form inputs with state</li>
            <li>• Real-time validation with error handling</li>
            <li>• Loading states with spinner animation</li>
            <li>• Success state with automatic reset</li>
            <li>• Console logging for debugging</li>
            <li>• Disabled inputs during submission</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between text-sm">
          <a 
            href="/sign-in-starter" 
            className="text-blue-600 hover:underline"
          >
            ← Back to Starter Template
          </a>
          <a 
            href="/sign-in-workshop" 
            className="text-blue-600 hover:underline"
          >
            Workshop Instructions →
          </a>
        </div>
      </div>
    </div>
  )
}
