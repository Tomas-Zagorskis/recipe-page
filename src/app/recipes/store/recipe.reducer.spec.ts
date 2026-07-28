import { Action } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import { recipeReducer, State } from './recipe.reducer';

const INIT = { type: '@@init' } as Action;

function makeRecipe(name: string): Recipe {
  return new Recipe(name, `${name} description`, 'http://example.com/x.png', [
    new Ingredient('Flour', 1),
  ]);
}

function initialState(): State {
  return recipeReducer(undefined, INIT);
}

describe('recipeReducer', () => {
  it('starts with no recipes', () => {
    expect(initialState().recipes).toEqual([]);
  });

  it('appends a recipe', () => {
    const state = recipeReducer(
      initialState(),
      RecipesActions.addRecipe({ recipe: makeRecipe('Soup') })
    );

    expect(state.recipes.length).toBe(1);
    expect(state.recipes[0].name).toBe('Soup');
  });

  it('replaces the recipe at the given index', () => {
    const seeded = recipeReducer(
      initialState(),
      RecipesActions.setRecipes({
        recipes: [makeRecipe('Soup'), makeRecipe('Stew')],
      })
    );

    const state = recipeReducer(
      seeded,
      RecipesActions.updateRecipe({ index: 1, recipe: makeRecipe('Salad') })
    );

    expect(state.recipes.map((r) => r.name)).toEqual(['Soup', 'Salad']);
  });

  it('removes the recipe at the given index', () => {
    const seeded = recipeReducer(
      initialState(),
      RecipesActions.setRecipes({
        recipes: [makeRecipe('Soup'), makeRecipe('Stew'), makeRecipe('Pie')],
      })
    );

    const state = recipeReducer(
      seeded,
      RecipesActions.deleteRecipe({ index: 1 })
    );

    expect(state.recipes.map((r) => r.name)).toEqual(['Soup', 'Pie']);
  });

  it('overwrites the whole list when recipes are fetched', () => {
    const seeded = recipeReducer(
      initialState(),
      RecipesActions.addRecipe({ recipe: makeRecipe('Stale') })
    );

    const state = recipeReducer(
      seeded,
      RecipesActions.setRecipes({ recipes: [makeRecipe('Fresh')] })
    );

    expect(state.recipes.map((r) => r.name)).toEqual(['Fresh']);
  });

  it('does not mutate the previous state', () => {
    const before = recipeReducer(
      initialState(),
      RecipesActions.setRecipes({ recipes: [makeRecipe('Soup')] })
    );

    recipeReducer(before, RecipesActions.deleteRecipe({ index: 0 }));

    expect(before.recipes.length).toBe(1);
  });
});
