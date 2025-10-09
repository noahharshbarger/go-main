'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignInWorkshop() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState([])
  
  const steps = [
    {
      id: 1,
      title: "Set Up Basic Form Structure",
      description: "Create the HTML form with input fields",
      task: "Add email and password input fields to the form",
      hint: "Use <input> tags with proper type, name, and placeholder attributes",
      solution: `<input type="email" name="email" placeholder="Enter your email" />
<input type="password" name="password" placeholder="Enter your password" />`
    },
    {
      id: 2,
      title: "Add State Management",
      description: "Set up React state to control form data",
      task: "Create state variables for form data, loading, and errors",
      hint: "Use useState hook for formData object, loading boolean, and error string",
      solution: `const [formData, setFormData] = useState({ email: '', password: '' })
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')`
    },
    {
      id: 3,
      title: "Handle Input Changes",
      description: "Make inputs controlled components",
      task: "Create handleChange function to update state when user types",
      hint: "Use event.target.name and event.target.value to update the correct field",
      solution: `const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
}`
    },
    {
      id: 4,
      title: "Add Form Validation",
      description: "Validate user input before submission",
      task: "Create validation function that checks email format and password length",
      hint: "Check if email contains '@' and password has at least 6 characters",
      solution: `const validateForm = () => {
  if (!formData.email || !formData.email.includes('@')) {
    setError('Please enter a valid email')
    return false
  }
  if (!formData.password || formData.password.length < 6) {
    setError('Password must be at least 6 characters')
    return false
  }
  return true
}`
    },
    {
      id: 5,
      title: "Handle Form Submission",
      description: "Process form when user clicks submit",
      task: "Create handleSubmit function with validation and loading states",
      hint: "Prevent default, validate, set loading true, simulate API call, handle response",
      solution: `const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validateForm()) return
  
  setLoading(true)
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert('Sign in successful!')
  } catch (error) {
    setError('Sign in failed')
  } finally {
    setLoading(false)
  }
}`
    },
    {
      id: 6,
      title: "Add Loading States",
      description: "Show user feedback during form submission",
      task: "Disable form and show loading indicator when submitting",
      hint: "Use loading state to conditionally show spinner and disable button",
      solution: `<button disabled={loading}>
  {loading ? 'Signing In...' : 'Sign In'}
</button>`
    }
  ]

  const markStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const currentStepData = steps.find(step => step.id === currentStep)
  const progress = (completedSteps.length / steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🛠️ Build a Sign-In Form Workshop
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn React form handling step-by-step. Complete each task at your own pace!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Progress</h2>
            <span className="text-sm text-gray-600">
              {completedSteps.length} of {steps.length} steps completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Workshop Steps */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Workshop Steps</h2>
            
            {/* Step Navigation */}
            <div className="flex flex-wrap gap-2 mb-6">
              {steps.map(step => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    currentStep === step.id 
                      ? 'bg-blue-500 text-white' 
                      : completedSteps.includes(step.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {step.id}
                  {completedSteps.includes(step.id) && ' ✓'}
                </button>
              ))}
            </div>

            {/* Current Step */}
            {currentStepData && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">
                    Step {currentStepData.id}: {currentStepData.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{currentStepData.description}</p>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">📝 Your Task:</h4>
                  <p className="text-yellow-800">{currentStepData.task}</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Hint:</h4>
                  <p className="text-blue-800">{currentStepData.hint}</p>
                </div>

                <details className="bg-gray-50 border rounded p-4">
                  <summary className="font-medium cursor-pointer text-gray-700 hover:text-gray-900">
                    🔍 Show Solution (try first!)
                  </summary>
                  <pre className="mt-4 bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
                    <code>{currentStepData.solution}</code>
                  </pre>
                </details>

                <div className="flex gap-4">
                  <button
                    onClick={() => markStepComplete(currentStepData.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    ✓ Mark Complete
                  </button>
                  
                  {currentStep < steps.length && (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Next Step →
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Live Preview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Live Preview</h2>
            
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-center mb-6">Your Sign-In Form</h3>
              
              {/* Demo Form (non-functional for display) */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Sign In
                </button>
              </form>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                This is a preview. Build your own version following the steps!
              </p>
            </div>

            {/* Working Example Link */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">🎯 See Working Example</h4>
              <p className="text-sm text-green-700 mb-3">
                Once you complete the workshop, compare with our working version:
              </p>
              <Link 
                href="/sign-in"
                className="text-green-600 hover:underline font-medium"
              >
                View Complete Sign-In Form →
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Challenges */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6">🚀 Bonus Challenges</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-semibold text-purple-900 mb-2">Challenge 1: Remember Me</h3>
              <p className="text-sm text-gray-600 mb-2">
                Add a "Remember Me" checkbox that stores the email in localStorage
              </p>
              <code className="text-xs bg-gray-100 p-1 rounded">
                localStorage.setItem('rememberedEmail', email)
              </code>
            </div>
            
            <div className="border-l-4 border-orange-400 pl-4">
              <h3 className="font-semibold text-orange-900 mb-2">Challenge 2: Show/Hide Password</h3>
              <p className="text-sm text-gray-600 mb-2">
                Add an eye icon to toggle password visibility
              </p>
              <code className="text-xs bg-gray-100 p-1 rounded">
                // Add this above your component's return statement:
                // const [showPassword, setShowPassword] = useState(false)
                type={showPassword ? 'text' : 'password'}
              </code>
            </div>
            
            <div className="border-l-4 border-red-400 pl-4">
              <h3 className="font-semibold text-red-900 mb-2">Challenge 3: Real-time Validation</h3>
              <p className="text-sm text-gray-600 mb-2">
                Show validation messages as user types, not just on submit
              </p>
              <code className="text-xs bg-gray-100 p-1 rounded">
                useEffect(() =&gt; validate(), [formData])
              </code>
            </div>
            
            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="font-semibold text-green-900 mb-2">Challenge 4: API Integration</h3>
              <p className="text-sm text-gray-600 mb-2">
                Connect to a real authentication API endpoint
              </p>
              <code className="text-xs bg-gray-100 p-1 rounded">
                fetch('/api/auth/signin', &#123;method: 'POST'&#125;)
              </code>
            </div>
          </div>
        </div>

        {/* Completion Certificate */}
        {completedSteps.length === steps.length && (
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg p-8 mt-8 text-white text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-xl mb-4">You've completed the Sign-In Form Workshop!</p>
            <p className="text-green-100">
              You now understand React form handling, state management, and user interaction patterns.
            </p>
          </div>
        )}

        {/* Quick Start Resources */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Ready to Start Coding?</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="/sign-in-starter"
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-green-200 hover:border-green-300"
            >
              <h4 className="font-bold text-green-700 mb-2">📝 Starter Template</h4>
              <p className="text-sm text-gray-600">
                Begin with the template and build the form step by step
              </p>
            </a>
            <a 
              href="/sign-in-solution"
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-blue-200 hover:border-blue-300"
            >
              <h4 className="font-bold text-blue-700 mb-2">✅ Complete Solution</h4>
              <p className="text-sm text-gray-600">
                See the finished form with all features implemented
              </p>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
