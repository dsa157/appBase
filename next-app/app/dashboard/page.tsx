export default function DashboardPage() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Usage Metrics */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Monthly Usage</h3>
              <div className="mt-2 text-3xl font-semibold text-gray-900">
                75%
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Current month's resource usage
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">API Calls</h3>
              <div className="mt-2 text-3xl font-semibold text-gray-900">
                1,234
              </div>
              <p className="mt-1 text-sm text-gray-500">
                This month's API requests
              </p>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Storage</h3>
              <div className="mt-2 text-3xl font-semibold text-gray-900">
                2.5 GB
              </div>
              <p className="mt-1 text-sm text-gray-500">
                of 10 GB used
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
