const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-2xl border border-red-200 shadow-md">
      <span className="text-5xl mb-3">⚠️</span>
      <h2 className="text-lg font-semibold text-red-700 mb-2">Something went wrong</h2>
      <p className="text-red-600 mb-4">{message || "An unexpected error occurred."}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
