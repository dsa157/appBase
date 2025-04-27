// /app/auth/login/page.tsx
'use client'
import dynamic from 'next/dynamic'
import { GoogleLoginButton } from '../../components/auth/GoogleLoginButton';

const LoginForm = dynamic(() => import('./LoginForm'), { ssr: false })

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <LoginForm />
      <GoogleLoginButton />
    </div>
  );
}