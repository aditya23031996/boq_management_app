export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  