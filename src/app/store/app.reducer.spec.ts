import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as AuthActions from '../auth/store/auth.actions';
import * as fromApp from './app.reducer';

/**
 * Integration cover for the root store. Unlike the per-reducer specs, this
 * drives the real @ngrx/store runtime, so it fails if the reducer map stops
 * composing correctly across an Angular/NgRx upgrade.
 */
describe('root store', () => {
  let store: Store<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(fromApp.appReducers)],
    });

    store = TestBed.inject(Store);
  });

  function currentState(): fromApp.AppState {
    let snapshot: fromApp.AppState;
    store.pipe(first()).subscribe((state) => (snapshot = state));
    return snapshot;
  }

  it('composes the shoppingList, auth and recipes slices', () => {
    const state = currentState();

    expect(Object.keys(state)).toContain('shoppingList');
    expect(Object.keys(state)).toContain('auth');
    expect(Object.keys(state)).toContain('recipes');
  });

  it('exposes each slice at its documented initial value', () => {
    const state = currentState();

    expect(state.shoppingList.ingredients.length).toBe(2);
    expect(state.shoppingList.editIndex).toBe(-1);
    expect(state.auth.user).toBeNull();
    expect(state.recipes.recipes).toEqual([]);
  });

  it('routes a dispatched action to the owning slice only', () => {
    store.dispatch(
      ShoppingListActions.addIngredient({
        ingredient: new Ingredient('Pears', 3),
      })
    );

    const state = currentState();

    expect(state.shoppingList.ingredients.length).toBe(3);
    expect(state.recipes.recipes).toEqual([]);
    expect(state.auth.user).toBeNull();
  });

  it('reflects an auth failure in the auth slice', () => {
    store.dispatch(
      AuthActions.authenticateFail({ errorMessage: 'EMAIL_NOT_FOUND' })
    );

    expect(currentState().auth.authError).toBe('EMAIL_NOT_FOUND');
  });
});
