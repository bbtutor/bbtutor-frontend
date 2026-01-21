import React from "react";

function ErrorMessage({ error }: { error: Error }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <div className="flex items-center justify-center min-h-100">
        <div className="max-w-md w-full text-center bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Error icon with animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Error title and description */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Unable to Load Mathematics Lessons
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            We&apos;re having trouble accessing the mathematics video lessons
            right now. This could be due to a network issue or temporary server
            maintenance. Wait a little and try again.
          </p>

          {/* Error details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-500 font-medium mb-1">
              Error details:
            </p>
            <p className="text-sm text-gray-700 font-mono break-all">
              {error.message || "Unknown error occurred"}
            </p>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Try Again
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Go Back
            </button>
          </div>

          {/* Help text */}
          <p className="text-xs text-gray-500 mt-6">
            If this problem persists, please contact our support team or try
            again later.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ErrorMessage;
