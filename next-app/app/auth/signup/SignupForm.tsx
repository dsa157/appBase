'use client'
import Link from 'next/link'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'

export default function SignupForm() {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-center">Create an account</h1>
      <div className="space-y-4">
        <button className="auth-btn auth-btn-google">
          <FaGoogle className="text-lg" /> Continue with Google
        </button>
        <button className="auth-btn auth-btn-facebook">
          <FaFacebook className="text-lg" /> Continue with Facebook
        </button>
        <button className="auth-btn auth-btn-apple">
          <FaApple className="text-lg" /> Continue with Apple
        </button>
      </div>
      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-medium text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
