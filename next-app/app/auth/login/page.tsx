// /app/auth/login/page.tsx
'use client'
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState({
    google: false,
    facebook: false
  });

  const handleSocialLogin = async (provider: string) => {
    setLoading(prev => ({...prev, [provider]: true}));
    try {
      const result = await signIn(provider, { 
        redirect: false,
        callbackUrl: process.env.NEXTAUTH_URL || 'https://yourdomain.com'
      });
      if (result?.url) router.push(result.url);
    } finally {
      setLoading(prev => ({...prev, [provider]: false}));
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <div className="space-y-4">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={loading.google}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          >
            <FaGoogle className="text-lg" />
            {loading.google ? 'Processing...' : 'Continue with Google'}
          </button>
          <button
            onClick={() => handleSocialLogin('facebook')}
            disabled={loading.facebook}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#1877F2] text-white hover:bg-[#166FE5]"
          >
            <FaFacebook className="text-lg" />
            {loading.facebook ? 'Processing...' : 'Continue with Facebook'}
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}