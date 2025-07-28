import React from 'react';
import { ChefHat, Download } from 'lucide-react';
import { WeeklyMenu } from '../types/menu';

interface HeaderProps {
  onDownload: () => void;
  weeklyMenu: WeeklyMenu | null;
}

export const Header: React.FC<HeaderProps> = ({ onDownload, weeklyMenu }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <ChefHat className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Menu Decider</h1>
              <p className="text-blue-100 mt-1">Smart weekly meal planning with unique combos</p>
            </div>
          </div>
          
          {weeklyMenu && (
            <button
              onClick={onDownload}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              <Download className="w-5 h-5" />
              <span className="font-medium">Download JSON</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};