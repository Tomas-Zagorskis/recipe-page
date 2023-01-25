import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  ingredientEmitter = new EventEmitter<Ingredient[]>();

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
    this.ingredientEmitter.emit([...this.ingredients]);
  }
}
