import React from "react";

/**
 * VALIDATION ERRORS COMPONENT
 * 
 * This demonstrates:
 * - Error handling patterns
 * - Conditional rendering
 * - User feedback
 */

const ValidationErrors = ({ errors }) => {
  // Don't render if no errors
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <div className="text-red-600 text-lg mr-2">⚠️</div>
        <h3 className="text-red-800 font-semibold">Please fix the following errors:</h3>
      </div>
      <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
        {Object.entries(errors).map(([field, message]) => (
          <li key={field}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ValidationErrors;
