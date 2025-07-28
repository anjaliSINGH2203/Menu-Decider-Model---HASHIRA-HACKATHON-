export interface MenuItem {
  item_name: string;
  category: 'main' | 'side' | 'drink';
  calories: number;
  taste_profile: 'spicy' | 'savory' | 'sweet';
  popularity_score: number;
}

export interface MealCombo {
  combo_id: string;
  main: MenuItem;
  side: MenuItem;
  drink: MenuItem;
  total_calories: number;
  popularity_score: number;
  reasoning: string;
}

export interface DayMenu {
  day: string;
  date: string;
  combos: MealCombo[];
  meal_type: 'spicy' | 'savory' | 'sweet';
}

export interface WeeklyMenu {
  week_start_date: string;
  days: DayMenu[];
}