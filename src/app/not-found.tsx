export default function NotFound() {
  return (
    <section className="min-h-screen gradient-bg flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      {/* 404 Illustration */}
      <div className="relative mb-6 sm:mb-8 md:mb-12">
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto relative">
          {/* Fallback content if image doesn't exist */}
          <div className="w-full h-full grid place-items-center bg-primary/10 rounded-full">
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary">
              404
            </span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4 md:mb-6 text-center px-4">
        Page is under maintenance
      </h1>

      {/* Optional: Add a description */}
      <p className="text-sm sm:text-base md:text-lg text-gray-700 text-center max-w-md px-4 mb-6 sm:mb-8">
        We&apos;re working hard to improve your experience. Please check back
        soon.
      </p>
    </section>
  );
}
