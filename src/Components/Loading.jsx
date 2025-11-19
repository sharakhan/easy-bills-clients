const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-80 space-y-6">
      {/* Spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <p className="text-gray-600 text-lg font-semibold animate-pulse tracking-wide">
        Loading bills, please wait...
      </p>
    </div>
  );
};

export default Loading;
