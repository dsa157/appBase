// /app/auth/login/page.tsx
'use client'
import dynamic from 'next/dynamic'

const LoginForm = dynamic(() => import('./LoginForm'), { ssr: false })

export default function LoginPage() {
  return <LoginForm />
}