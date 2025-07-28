import React from 'react';
import { ChevronDown } from 'lucide-react';

interface WeekSelectorProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
}

export const WeekSelector: React.FC<WeekSelectorProps> = ({ selectedDay, onDayChange }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="relative">
      <select
        value={selectedDay}
        onChange={(e) => onDayChange(e.target.value)}
        className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-6 py-3 pr-12 text-lg font-medium text-gray-700 hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 cursor-pointer shadow-sm"
      >
        {days.map((day) => (
          <option key={day} value={day}>
            Start from {day}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  );
};