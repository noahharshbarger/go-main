'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
 
export default function SignIn() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (error) setError('')
    }

    const validateForm = () => {
        if (!formData.email) {
            setError('Email is required')
            return false
        }

        if (!formData.email.includes('@')) {
            setError('Please enter a valid email')
            return false
        }
        if (!formData.password) {
            setError('Password is required')
            return false
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters')
            return false

        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)
        setError('')

        try {
            console.log('Attempting to sign in with:', formData.email)

            await new Promise(resolve => setTimeout(resolve, 2000))

            if (formData.email === 'demo@solar.com' && formData.password === 'password123') {
                setSuccess(true)
                console.log('Sign in successful!')

                router.push('/')
            } else {
                setError('Invalid email or password')
            }
        } catch (error) {
            setError('Something went wrong. Please try again.') 
            console.error('Sign in error:', error)
        } finally {
            setLoading(false)
        }
    }
    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
                <div className="p-8 rounded-lg shadow-lg max-w-md w-full text-center bg-white">
                    <div className="text-6xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-black-700 mb-2">Welcome back!</h2>
                    <p className="text-gray-600 mb-6">You have successfully signed in.</p>
                    <Link href="/" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 inline-block">
                        Go to Dashboard
                    </Link>
                </div>
                </div>
        )
    }

    return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
                        <p className="text-gray-600">Welcome back to Solar Mapper</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg mb-6">
                            <h3 className="font-medium text-blue-900 mb-2">Demo Credentials</h3>
                            <p className="text-sm text-blue-700">Email:
                                demo@solar.com
                            </p>
                            <p className="text-sm text-blue-700">Password:
                                password123
                            </p>
                            </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                    disabled={loading}
                                    />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                    disabled={loading}
                                    />
                            </div>
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                    {error}
                                    </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-4 h-4 border-2 border-black border rounded-full animate-bounce mr-2"></div>
                                            Signing In...
                                                </div>
                                    ) : (
                                        'Sign In'
                                    )
                                }
                                </button>
                        </form>
                    </div>
            </div>
            )

}
