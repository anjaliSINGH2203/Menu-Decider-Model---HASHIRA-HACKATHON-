import React, { useState, useEffect } from 'react';
import { WeeklyMenu } from './types/menu';
import { menuGenerator } from './utils/menuGenerator';
import { Header } from './components/Header';
import { WeekSelector } from './components/WeekSelector';
import { DayCard } from './components/DayCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RefreshCw, Info } from 'lucide-react';

function App() {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenu | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateMenu = async (startDay: string) => {
    setIsLoading(true);
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const menu = menuGenerator.generateWeeklyMenu(startDay);
      setWeeklyMenu(menu);
    } catch (error) {
      console.error('Error generating menu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateMenu(selectedDay);
  }, [selectedDay]);

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
  };

  const handleDownload = () => {
    if (!weeklyMenu) return;

    const dataStr = JSON.stringify(weeklyMenu, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `menu-${weeklyMenu.week_start_date}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleRefresh = () => {
    generateMenu(selectedDay);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onDownload={handleDownload} weeklyMenu={weeklyMenu} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <WeekSelector selectedDay={selectedDay} onDayChange={handleDayChange} />
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-3 rounded-xl transition-all duration-200 font-medium"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
            <Info className="w-4 h-4" />
            <span>Combos follow 3-day uniqueness rule</span>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSpinner />
        ) : weeklyMenu ? (
          <div className="space-y-8">
            {weeklyMenu.days.map((dayMenu, index) => (
              <DayCard key={`${dayMenu.day}-${index}`} dayMenu={dayMenu} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No menu generated yet. Please try again.</p>
          </div>
        )}

        {/* Stats */}
        {weeklyMenu && !isLoading && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {weeklyMenu.days.reduce((total, day) => total + day.combos.length, 0)}
                </div>
                <div className="text-gray-600">Total Combos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round(weeklyMenu.days.reduce((total, day) => 
                    total + day.combos.reduce((dayTotal, combo) => dayTotal + combo.total_calories, 0), 0
                  ) / weeklyMenu.days.length)}
                </div>
                <div className="text-gray-600">Avg Daily Calories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {(weeklyMenu.days.reduce((total, day) => 
                    total + day.combos.reduce((dayTotal, combo) => dayTotal + combo.popularity_score, 0), 0
                  ) / weeklyMenu.days.reduce((total, day) => total + day.combos.length, 0) * 100).toFixed(0)}%
                </div>
                <div className="text-gray-600">Avg Popularity</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;