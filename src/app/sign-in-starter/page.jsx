'use client'

import { useState } from 'react'

export default function SignInStarterTemplate() {
  // TODO: Step 2 - Add state management here
  // const [formData, setFormData] = useState({...})
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState('')

  // TODO: Step 3 - Create handleChange function
  // const handleChange = (e) => {
  //   // Your code here
  // }

  // TODO: Step 4 - Create validation function
  // const validateForm = () => {
  //   // Your validation logic here
  //   return true
  // }

  // TODO: Step 5 - Create handleSubmit function
  // const handleSubmit = async (e) => {
  //   // Your submission logic here
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-600">Build this form step by step!</p>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-yellow-800 mb-2">📝 Your Task:</h3>
          <p className="text-sm text-yellow-700">
            Follow the workshop steps to make this form functional. 
            Start with adding state management!
          </p>
        </div>

        {/* TODO: Step 1 - Complete this form */}
        <form className="space-y-6">
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            {/* TODO: Add value, onChange, and other properties */}
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            {/* TODO: Add value, onChange, and other properties */}
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {/* TODO: Step 6 - Add error display here */}
          {/* 
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          */}

          {/* TODO: Step 6 - Make this button dynamic with loading state */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 Quick Tips:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Use controlled components (value + onChange)</li>
            <li>• Always prevent default form submission</li>
            <li>• Validate before submitting</li>
            <li>• Show loading states for better UX</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-6 text-center">
          <a 
            href="/sign-in-workshop" 
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Workshop Instructions
          </a>
        </div>
      </div>
    </div>
  )
}
