'use client';

export default function SignInPage() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
              >
                <span className="sr-only">Sign in with Google</span>
                Sign in with Google
              </button>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:outline-offset-0"
              >
                <span className="sr-only">Sign in with Facebook</span>
                Sign in with Facebook
              </button>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-black px-4 py-2 text-white shadow-sm hover:bg-gray-800 focus:outline-offset-0"
              >
                <span className="sr-only">Sign in with Apple</span>
                Sign in with Apple
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
