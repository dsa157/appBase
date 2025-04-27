'use client'
import Link from 'next/link'
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState({
    google: false,
    facebook: false,
    apple: false
  });

  const handleSocialLogin = async (provider: string) => {
    setLoading(prev => ({...prev, [provider]: true}));
    console.log(`Initiating ${provider} signup...`);
    
    try {
      const result = await signIn(provider, { redirect: false });
      
      if (result?.error) {
        console.error(`${provider} signup failed:`, result.error);
      } else {
        console.log(`${provider} signup successful`, result);
        if (result?.url) {
          // Close the dialog if this is rendered within one
          const dialog = document.querySelector('dialog[open]');
          if (dialog) {
            (dialog as HTMLDialogElement).close();
          }
          router.push(result.url);
        } else {
          router.push('/');
        }
      }
    } catch (error) {
      console.error(`Unexpected error during ${provider} signup:`, error);
    } finally {
      setLoading(prev => ({...prev, [provider]: false}));
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-center">Create an account</h1>
      <div className="space-y-4">
        <button 
          className="auth-btn auth-btn-google"
          onClick={() => handleSocialLogin('google')}
          disabled={loading.google}
        >
          <FaGoogle className="text-lg" /> 
          {loading.google ? 'Processing...' : 'Continue with Google'}
        </button>
        <button 
          className="auth-btn auth-btn-facebook"
          onClick={() => handleSocialLogin('facebook')}
          disabled={loading.facebook}
        >
          <FaFacebook className="text-lg" /> 
          {loading.facebook ? 'Processing...' : 'Continue with Facebook'}
        </button>
        <button 
          className="auth-btn auth-btn-apple"
          onClick={() => handleSocialLogin('apple')}
          disabled={loading.apple}
        >
          <FaApple className="text-lg" /> 
          {loading.apple ? 'Processing...' : 'Continue with Apple'}
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
