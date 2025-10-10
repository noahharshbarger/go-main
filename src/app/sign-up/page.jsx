
'use client'

import { useState } from 'react'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // DRY (Don't Repeat Yourself) input class for Tailwind + @tailwindcss/forms
  const inputClass =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand focus:ring focus:ring-brand/20 text-base bg-white dark:bg-gray-900'

  function validate(values) {
    const errs = {}
    if (!values.email) {
      errs.email = 'Email is required.'
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      errs.email = 'Enter a valid email.'
    } if (!values.password) {
      errs.password = 'Password is required.'
    } else if (values.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.'
    } else if (!/[A-Z]/.test(values.password)) {
      errs.password = 'Password must contain an uppercase letter.'
    } else if (!/[0-9]/.test(values.password)) {
      errs.password = 'Password must contain a number.'
    } if (values.confirmPassword !== values.password) {
      errs.confirmPassword = 'Passwords do not match.'
    } 
    return errs
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: undefined })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
      // Here you would hash the password before sending to server
      // e.g. bcryptjs or similar (see security tip below)
    }
  }

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      {/* Security Best Practices Info */}
      <div className="mb-4 p-3 rounded bg-blue-50 border border-blue-200 text-blue-900 text-sm">
        <strong>Security Tip:</strong> Never store plain-text passwords. Always hash passwords on the server (e.g. with <code>bcrypt</code>). Use HTTPS and validate on both client and server.
      </div>

      {/* Tailwind CSS Info */}
      <div className="mb-4 p-3 rounded bg-green-50 border border-green-200 text-green-900 text-sm">
        <strong>Tailwind Tip:</strong> This form uses <code>@tailwindcss/forms</code> for better input styling and a DRY <code>inputClass</code> for consistency.
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded shadow">
        <div>
          <label htmlFor="email" className="block font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className={inputClass + ' pr-10'}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-700"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block font-medium">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            className={inputClass}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-brand text-white font-semibold rounded hover:bg-brand-dark transition"
        >
          Sign Up
        </button>
        {submitted && (
          <div className="mt-4 p-3 rounded bg-green-100 border border-green-300 text-green-900 text-sm">
            Account created! (This is a demo. In production, always hash passwords and validate on the server.)
          </div>
        )}
      </form>
    </div>
  );
}