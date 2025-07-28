import { MenuItem, MealCombo, DayMenu, WeeklyMenu } from '../types/menu';
import { menuItems } from '../data/menuItems';

export class MenuGenerator {
  private usedCombos: Set<string> = new Set();
  private comboHistory: { [key: number]: string[] } = {};

  private getItemsByCategory(category: 'main' | 'side' | 'drink'): MenuItem[] {
    return menuItems.filter(item => item.category === category);
  }

  private generateComboId(main: MenuItem, side: MenuItem, drink: MenuItem): string {
    return `${main.item_name}-${side.item_name}-${drink.item_name}`;
  }

  private canUseCombo(comboId: string, dayIndex: number): boolean {
    // Check if combo was used in the last 3 days
    for (let i = Math.max(0, dayIndex - 3); i < dayIndex; i++) {
      if (this.comboHistory[i]?.includes(comboId)) {
        return false;
      }
    }
    return true;
  }

  private generateComboReasoning(main: MenuItem, side: MenuItem, drink: MenuItem): string {
    const totalCalories = main.calories + side.calories + drink.calories;
    const avgPopularity = ((main.popularity_score + side.popularity_score + drink.popularity_score) / 3).toFixed(2);
    
    const profiles = [main.taste_profile, side.taste_profile, drink.taste_profile];
    const dominantProfile = profiles.reduce((a, b, _, arr) => 
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
    );

    return `Balanced ${dominantProfile} meal with ${totalCalories} calories. High popularity score of ${avgPopularity} ensures customer satisfaction.`;
  }

  private calculatePopularityScore(main: MenuItem, side: MenuItem, drink: MenuItem): number {
    return Number(((main.popularity_score + side.popularity_score + drink.popularity_score) / 3).toFixed(2));
  }

  private classifyMealType(combos: MealCombo[]): 'spicy' | 'savory' | 'sweet' {
    const profiles = combos.flatMap(combo => [
      combo.main.taste_profile,
      combo.side.taste_profile,
      combo.drink.taste_profile
    ]);

    const counts = profiles.reduce((acc, profile) => {
      acc[profile] = (acc[profile] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).reduce((a, b) => counts[a[0]] > counts[b[0]] ? a : b)[0] as 'spicy' | 'savory' | 'sweet';
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  generateDayMenu(dayIndex: number, dayName: string, date: string): DayMenu {
    const mains = this.shuffleArray(this.getItemsByCategory('main'));
    const sides = this.shuffleArray(this.getItemsByCategory('side'));
    const drinks = this.shuffleArray(this.getItemsByCategory('drink'));

    const combos: MealCombo[] = [];
    const usedMains = new Set<string>();
    const usedSides = new Set<string>();
    const usedDrinks = new Set<string>();

    let attempts = 0;
    const maxAttempts = 100;

    while (combos.length < 3 && attempts < maxAttempts) {
      attempts++;

      for (const main of mains) {
        if (usedMains.has(main.item_name)) continue;

        for (const side of sides) {
          if (usedSides.has(side.item_name)) continue;

          for (const drink of drinks) {
            if (usedDrinks.has(drink.item_name)) continue;

            const comboId = this.generateComboId(main, side, drink);

            if (this.canUseCombo(comboId, dayIndex)) {
              const combo: MealCombo = {
                combo_id: comboId,
                main,
                side,
                drink,
                total_calories: main.calories + side.calories + drink.calories,
                popularity_score: this.calculatePopularityScore(main, side, drink),
                reasoning: this.generateComboReasoning(main, side, drink)
              };

              combos.push(combo);
              usedMains.add(main.item_name);
              usedSides.add(side.item_name);
              usedDrinks.add(drink.item_name);

              // Track combo usage
              if (!this.comboHistory[dayIndex]) {
                this.comboHistory[dayIndex] = [];
              }
              this.comboHistory[dayIndex].push(comboId);

              break;
            }
          }
          if (combos.length >= 3) break;
        }
        if (combos.length >= 3) break;
      }
    }

    // If we couldn't generate 3 unique combos, fill with available combinations
    while (combos.length < 3) {
      const availableMains = mains.filter(m => !usedMains.has(m.item_name));
      const availableSides = sides.filter(s => !usedSides.has(s.item_name));
      const availableDrinks = drinks.filter(d => !usedDrinks.has(d.item_name));

      if (availableMains.length === 0 || availableSides.length === 0 || availableDrinks.length === 0) {
        break;
      }

      const main = availableMains[0];
      const side = availableSides[0];
      const drink = availableDrinks[0];

      const combo: MealCombo = {
        combo_id: this.generateComboId(main, side, drink),
        main,
        side,
        drink,
        total_calories: main.calories + side.calories + drink.calories,
        popularity_score: this.calculatePopularityScore(main, side, drink),
        reasoning: this.generateComboReasoning(main, side, drink)
      };

      combos.push(combo);
      usedMains.add(main.item_name);
      usedSides.add(side.item_name);
      usedDrinks.add(drink.item_name);
    }

    return {
      day: dayName,
      date,
      combos,
      meal_type: this.classifyMealType(combos)
    };
  }

  generateWeeklyMenu(startDay: string): WeeklyMenu {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const startIndex = days.indexOf(startDay);
    
    if (startIndex === -1) {
      throw new Error('Invalid start day');
    }

    // Reset state for new week generation
    this.usedCombos.clear();
    this.comboHistory = {};

    const weekDays = [];
    const startDate = new Date();
    
    for (let i = 0; i < 7; i++) {
      const dayIndex = (startIndex + i) % 7;
      const dayName = days[dayIndex];
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayMenu = this.generateDayMenu(i, dayName, date.toISOString().split('T')[0]);
      weekDays.push(dayMenu);
    }

    return {
      week_start_date: startDate.toISOString().split('T')[0],
      days: weekDays
    };
  }
}

export const menuGenerator = new MenuGenerator();