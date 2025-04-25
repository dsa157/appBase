export default function PricingPage() {
  const plans = [
    {
      name: 'Basic',
      price: '$9',
      period: '/month',
      features: [
        '10 projects',
        '5 team members',
        'Basic analytics',
        'Email support'
      ],
      cta: 'Get Started',
      featured: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      features: [
        'Unlimited projects',
        '20 team members',
        'Advanced analytics',
        'Priority support',
        'API access'
      ],
      cta: 'Get Started',
      featured: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      features: [
        'Unlimited projects',
        'Unlimited team members',
        'Advanced analytics',
        '24/7 support',
        'Dedicated account manager',
        'Custom integrations'
      ],
      cta: 'Contact Sales',
      featured: false
    }
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pricing plans
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="mt-16 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative p-8 bg-white border rounded-lg shadow-sm ${plan.featured ? 'border-primary-500 ring-2 ring-primary-500' : 'border-gray-200'}`}
            >
              {plan.featured && (
                <div className="absolute top-0 py-1.5 px-4 bg-primary-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                  Most popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <svg className="flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-3 text-gray-500">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button
                  type="button"
                  className={`block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${plan.featured ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-gray-50 text-primary-600 hover:bg-gray-100'} focus:outline-none`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
