import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  ingredientEmitter = new Subject<Ingredient[]>();

  getIngredients() {
    return [...this.ingredients];
  }

  addIngredient(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      const selectedIngredient = this.ingredients.find(
        (ing) => ing.name === ingredient.name
      );
      if (selectedIngredient) {
        selectedIngredient.amount =
          selectedIngredient.amount + ingredient.amount;
      } else {
        this.ingredients.push(ingredient);
      }
    });
    this.ingredientEmitter.next([...this.ingredients]);
  }
}
