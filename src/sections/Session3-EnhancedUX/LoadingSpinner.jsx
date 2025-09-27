import React from "react";

/**
 * LOADING SPINNER COMPONENT
 * 
 * This demonstrates:
 * - Component composition
 * - Reusable UI components
 * - Props and customization
 */

const LoadingSpinner = ({ 
  size = "w-8 h-8", 
  color = "border-blue-600", 
  message = "Loading..." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${size} border-4 border-gray-200 ${color} border-t-transparent rounded-full animate-spin mb-4`}></div>
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
