import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  startedEditing = new Subject<any>();
  ingredientsChanged = new Subject<Ingredient[]>();

  getIngredients() {
    return [...this.ingredients];
  }

  getIngredient(index: number) {
    return this.ingredients[index];
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
    this.ingredientsChanged.next([...this.ingredients]);
  }

  updateIngredients(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
