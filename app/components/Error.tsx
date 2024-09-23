import React from "react";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  errorCode?: string | number;
  showRetryButton?: boolean;
}

const CustomError: React.FC<ErrorProps> = ({
  message = "Something went wrong.",
  onRetry,
  errorCode,
  showRetryButton = true,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-md mx-auto shadow-md">
        <strong className="font-bold text-lg">Error</strong>
        {errorCode && (
          <span className="block sm:inline mt-2 text-sm">
            Code: {errorCode}
          </span>
        )}
        <span className="block sm:inline mt-2">{message}</span>

        {showRetryButton && onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomError;
