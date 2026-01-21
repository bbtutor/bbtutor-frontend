export default function Loader() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-20">
      <div className="animate-pulse">
        {/* Skeleton title */}
        <div className="h-8 bg-gray-200 rounded-lg w-1/3 mx-auto mb-4"></div>

        {/* Skeleton description */}
        <div className="h-4 bg-gray-200 rounded-lg w-2/3 mx-auto mb-8"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-1/2 mx-auto mb-12"></div>

        {/* Skeleton cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              {/* Skeleton card image */}
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>

              {/* Skeleton card title */}
              <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3"></div>

              {/* Skeleton card description lines */}
              <div className="h-4 bg-gray-200 rounded-lg w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-5/6 mb-4"></div>

              {/* Skeleton card button */}
              <div className="h-10 bg-gray-200 rounded-lg w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
