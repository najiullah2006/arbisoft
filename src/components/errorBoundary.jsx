import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // This updates the state so the next render cycle displays the fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Use this to log the error to console or an external tracking service
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an uncaught rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI matching your dark workspace theme
      return (
        <div className="min-h-screen bg-[#1a1b23] text-white flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full bg-[#242630] p-8 rounded-2xl shadow-xl border border-red-500/30 text-center">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-extrabold mb-2 tracking-tight">Something Went Wrong</h1>
            <p className="text-gray-400 text-sm mb-6">
              An unexpected interface crash occurred. We've logged the error, and we're looking into it.
            </p>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold tracking-wide transition duration-150 shadow-lg shadow-blue-600/20"
            >
              Return to Safety (Go Home)
            </button>
          </div>
        </div>
      );
    }

    // If there's no error, render the normal children components
    return this.props.children;
  }
}

export default ErrorBoundary;