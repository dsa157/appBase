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
            <div className="flex space-x-1 text-white">
              <Link href="/auth/login" className="hover:text-gray-200 transition-colors font-medium">
                Login
              </Link>
              <span>/</span>
              <Link href="/auth/signup" className="hover:text-gray-200 transition-colors font-medium">
                Sign Up
              </Link>
            </div>
          </nav>
          
          <div className="md:hidden">
            <button className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex flex-col space-y-4 py-4">
              <div className="flex space-x-1 text-white">
                <Link href="/auth/login" className="hover:text-gray-200 transition-colors font-medium">
                  Login
                </Link>
                <span>/</span>
                <Link href="/auth/signup" className="hover:text-gray-200 transition-colors font-medium">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
