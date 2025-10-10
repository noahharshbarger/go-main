"use client"

import { useState } from "react"
import Link from "next/link"

const steps = [
  {
    title: "Create the Form Structure",
    description: "Start by building a form with email, password, and confirm password fields. Use Tailwind's grid, spacing, and border utilities for layout.",
    hint: "Use <form>, <input>, and <label> elements. Try grid-cols-1 or grid-cols-2 for layout.",
    solution: `<form className=\"space-y-6\">\n  <div className=\"grid grid-cols-1 gap-4\">\n    <label>Email</label>\n    <input type=\"email\" className=\"border rounded px-3 py-2\" />\n    ...\n  </div>\n</form>`
  },
  {
    title: "Add State Management",
    description: "Use useState to manage form values. Bind value and onChange to each input.",
    hint: "const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' })",
    solution: `const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' })` 
  },
  {
    title: "Validate the Form",
    description: "Add validation for required fields, email format, password length, and password match. Show errors using Tailwind alert classes.",
    hint: "Check for empty fields, use includes('@'), compare passwords.",
    solution: `if (!formData.email) setError('Email is required')` 
  },
  {
    title: "Add Loading and Success States",
    description: "Show a loading spinner and a success message. Use Tailwind's bg-gradient, text, and animation classes.",
    hint: "Use useState for loading/success. Use animate-spin and bg-gradient-to-br.",
    solution: `<svg className=\"animate-spin ...\"></svg>`
  },
  {
    title: "Style with Tailwind Config",
    description: "Go beyond className! Add a custom color and font to tailwind.config.js. Use them in your form.",
    hint: "Add theme.extend.colors and theme.extend.fontFamily in tailwind.config.js.",
    solution: `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: { brand: '#1e40af' },\n      fontFamily: { display: ['Oswald', 'sans-serif'] }\n    }\n  }\n}`
  },
  {
    title: "Bonus: Use Tailwind Plugin",
    description: "Install and use a Tailwind plugin (like @tailwindcss/forms) to improve form styles.",
    hint: "npm install @tailwindcss/forms, then add to plugins in tailwind.config.js.",
    solution: `// tailwind.config.js\nplugins: [require('@tailwindcss/forms')]` 
  }
]

export default function SignUpWorkshop() {
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1)
    else setCompleted(true)
  }
  const prevStep = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-brand font-display mb-2">Sign Up Workshop</h1>
          <p className="text-gray-600">Build a sign up form step by step, and learn advanced Tailwind usage!</p>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Step {step + 1} of {steps.length}</span>
            <span className="text-sm text-gray-500">{steps[step].title}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-brand h-2 rounded-full transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">{steps[step].title}</h2>
          <p className="mb-4 text-gray-700">{steps[step].description}</p>
          <div className="mb-2">
            <span className="font-semibold text-blue-700">💡 Hint:</span> <span className="text-blue-700">{steps[step].hint}</span>
          </div>
          <details className="mb-2">
            <summary className="cursor-pointer text-green-700 font-semibold">Show Solution</summary>
            <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto"><code>{steps[step].solution}</code></pre>
          </details>
        </div>
        <div className="flex justify-between">
          <button onClick={prevStep} disabled={step === 0} className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-medium disabled:opacity-50">Back</button>
          <button onClick={nextStep} disabled={completed} className="px-4 py-2 rounded bg-brand text-white font-medium hover:bg-blue-800 disabled:opacity-50">{step === steps.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
        {completed && (
          <div className="mt-8 bg-green-100 border border-green-300 rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Workshop Complete!</h2>
            <p className="text-green-700 mb-2">You built a sign up form and learned advanced Tailwind config!</p>
            <Link href="/sign-up" className="text-blue-700 underline">See the Complete Solution</Link>
          </div>
        )}
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline text-sm">← Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
