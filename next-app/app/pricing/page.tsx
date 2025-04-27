'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$9.99',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      id: 'pro',
      name: 'Pro', 
      price: '$19.99',
      features: ['All Basic features', 'Feature 4', 'Feature 5']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$49.99',
      features: ['All Pro features', 'Feature 6', 'Priority Support']
    }
  ];

  const handleSubscribe = async (planId: string) => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId }),
      });
      const { sessionId } = await response.json();
      await stripe!.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`border rounded-lg p-6 transition-all ${
              selectedPlan === plan.id 
                ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300 cursor-pointer'
            }`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
            <p className="text-2xl font-semibold mb-4">{plan.price}</p>
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            {selectedPlan === plan.id && (
              <button 
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Subscribe'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
