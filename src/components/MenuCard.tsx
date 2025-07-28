import React from 'react';
import { MealCombo } from '../types/menu';
import { Utensils, Coffee, Cookie } from 'lucide-react';

interface MenuCardProps {
  combo: MealCombo;
  index: number;
}

export const MenuCard: React.FC<MenuCardProps> = ({ combo, index }) => {
  const getGradient = (index: number) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600'
    ];
    return gradients[index % 3];
  };

  return (
    <div className={`bg-gradient-to-br ${getGradient(index)} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Combo {index + 1}</h3>
        <div className="flex items-center space-x-1 text-sm bg-white/20 px-3 py-1 rounded-full">
          <span>{combo.total_calories}</span>
          <span>cal</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Utensils className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">{combo.main.item_name}</p>
            <p className="text-sm opacity-80">{combo.main.calories} cal</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Cookie className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">{combo.side.item_name}</p>
            <p className="text-sm opacity-80">{combo.side.calories} cal</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Coffee className="w-5 h-5 flex-shrink-0" />
          <div>
            <p className="font-medium">{combo.drink.item_name}</p>
            <p className="text-sm opacity-80">{combo.drink.calories} cal</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between text-sm">
          <span>Popularity</span>
          <div className="flex items-center space-x-1">
            <div className="w-16 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${combo.popularity_score * 100}%` }}
              />
            </div>
            <span>{(combo.popularity_score * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};