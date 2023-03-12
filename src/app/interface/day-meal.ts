import { MealItem } from './meal-item';

export interface DayMeal {
	breakfast: MealItem[];
	morningSnack: MealItem[];
	lunch: MealItem[];
	eveningSnack: MealItem[];
	dinner: MealItem[];
}
