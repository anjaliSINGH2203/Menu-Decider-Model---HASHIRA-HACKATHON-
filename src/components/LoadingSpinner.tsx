import React from 'react';
import { ChefHat } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <ChefHat className="w-12 h-12 text-blue-500 animate-bounce" />
        <div className="absolute inset-0 w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Generating your perfect menu...</p>
    </div>
  );
};