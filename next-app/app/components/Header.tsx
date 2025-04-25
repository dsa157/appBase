import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
            AppBase
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/dashboard" className="text-white hover:text-gray-200 transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/pricing" className="text-white hover:text-gray-200 transition-colors font-medium">
              Pricing
            </Link>
            <Link href="/profile" className="text-white hover:text-gray-200 transition-colors font-medium">
              Profile
            </Link>
          </nav>
          
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
