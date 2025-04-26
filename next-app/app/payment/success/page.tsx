'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!sessionId) return;
    
    // In a real app, you would verify the session with your backend
    setMessage('Payment successful! Your subscription is now active.');
  }, [sessionId]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you for your purchase!</h1>
      {message && <p className="text-xl mb-8">{message}</p>}
      <Link 
        href="/dashboard" 
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md inline-block"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
