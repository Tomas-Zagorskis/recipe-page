import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { shoppingListReducer, State } from './shopping-list.reducer';

const INIT = { type: '@@init' } as Action;

function initialState(): State {
  return shoppingListReducer(undefined, INIT);
}

describe('shoppingListReducer', () => {
  it('seeds the default ingredients with no row being edited', () => {
    const state = initialState();

    expect(state.ingredients.map((i) => i.name)).toEqual([
      'Apples',
      'Tomatoes',
    ]);
    expect(state.editIndex).toBe(-1);
  });

  it('appends a single ingredient', () => {
    const state = shoppingListReducer(
      initialState(),
      ShoppingListActions.addIngredient({
        ingredient: new Ingredient('Pears', 3),
      })
    );

    expect(state.ingredients.length).toBe(3);
    expect(state.ingredients[2]).toEqual(new Ingredient('Pears', 3));
  });

  it('appends many ingredients at once', () => {
    const state = shoppingListReducer(
      initialState(),
      ShoppingListActions.addIngredients({
        ingredients: [new Ingredient('Salt', 1), new Ingredient('Pepper', 2)],
      })
    );

    expect(state.ingredients.map((i) => i.name)).toEqual([
      'Apples',
      'Tomatoes',
      'Salt',
      'Pepper',
    ]);
  });

  it('records which row is being edited', () => {
    const state = shoppingListReducer(
      initialState(),
      ShoppingListActions.startEdit({ index: 1 })
    );

    expect(state.editIndex).toBe(1);
  });

  it('replaces the ingredient at the edit index and clears the edit', () => {
    const editing = shoppingListReducer(
      initialState(),
      ShoppingListActions.startEdit({ index: 0 })
    );

    const state = shoppingListReducer(
      editing,
      ShoppingListActions.updateIngredient({
        ingredient: new Ingredient('Apricots', 7),
      })
    );

    expect(state.ingredients[0]).toEqual({ name: 'Apricots', amount: 7 });
    expect(state.ingredients[1].name).toBe('Tomatoes');
    expect(state.editIndex).toBe(-1);
  });

  it('removes the ingredient at the edit index and clears the edit', () => {
    const editing = shoppingListReducer(
      initialState(),
      ShoppingListActions.startEdit({ index: 0 })
    );

    const state = shoppingListReducer(
      editing,
      ShoppingListActions.deleteIngredient()
    );

    expect(state.ingredients.map((i) => i.name)).toEqual(['Tomatoes']);
    expect(state.editIndex).toBe(-1);
  });

  it('abandons an edit without touching the ingredients', () => {
    const editing = shoppingListReducer(
      initialState(),
      ShoppingListActions.startEdit({ index: 1 })
    );

    const state = shoppingListReducer(
      editing,
      ShoppingListActions.stopEdit()
    );

    expect(state.editIndex).toBe(-1);
    expect(state.ingredients.map((i) => i.name)).toEqual([
      'Apples',
      'Tomatoes',
    ]);
  });

  it('does not mutate the previous state', () => {
    const before = initialState();

    shoppingListReducer(
      before,
      ShoppingListActions.addIngredient({
        ingredient: new Ingredient('Pears', 3),
      })
    );

    expect(before.ingredients.length).toBe(2);
  });
});
