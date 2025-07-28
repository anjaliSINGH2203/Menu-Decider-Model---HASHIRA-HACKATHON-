import React from 'react';
import { DayMenu } from '../types/menu';
import { MenuCard } from './MenuCard';
import { Calendar, Flame, Soup, Cake } from 'lucide-react';

interface DayCardProps {
  dayMenu: DayMenu;
}

export const DayCard: React.FC<DayCardProps> = ({ dayMenu }) => {
  const getMealTypeIcon = (type: 'spicy' | 'savory' | 'sweet') => {
    switch (type) {
      case 'spicy':
        return <Flame className="w-5 h-5 text-red-500" />;
      case 'savory':
        return <Soup className="w-5 h-5 text-yellow-600" />;
      case 'sweet':
        return <Cake className="w-5 h-5 text-pink-500" />;
    }
  };

  const getMealTypeEmoji = (type: 'spicy' | 'savory' | 'sweet') => {
    switch (type) {
      case 'spicy':
        return '🌶️';
      case 'savory':
        return '🍜';
      case 'sweet':
        return '🍰';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="w-6 h-6 text-gray-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{dayMenu.day}</h2>
            <p className="text-gray-500">{new Date(dayMenu.date).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
          {getMealTypeIcon(dayMenu.meal_type)}
          <span className="font-medium text-gray-700 capitalize">{dayMenu.meal_type}</span>
          <span className="text-lg">{getMealTypeEmoji(dayMenu.meal_type)}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        {dayMenu.combos.map((combo, index) => (
          <MenuCard key={combo.combo_id} combo={combo} index={index} />
        ))}
      </div>

      {dayMenu.combos.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-2">Today's Highlight</h4>
          <p className="text-sm text-gray-600">{dayMenu.combos[0].reasoning}</p>
        </div>
      )}
    </div>
  );
};