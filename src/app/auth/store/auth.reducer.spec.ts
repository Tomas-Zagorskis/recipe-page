import { Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { authReducer, State } from './auth.reducer';

const INIT = { type: '@@init' } as Action;

function initialState(): State {
  return authReducer(undefined, INIT);
}

function futureDate(): Date {
  return new Date(new Date().getTime() + 60 * 60 * 1000);
}

describe('authReducer', () => {
  it('starts logged out, with no error and not loading', () => {
    const state = initialState();

    expect(state.user).toBeNull();
    expect(state.authError).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('enters the loading state on login start', () => {
    const state = authReducer(
      initialState(),
      AuthActions.loginStart({ email: 'a@b.com', password: 'pw' })
    );

    expect(state.loading).toBe(true);
    expect(state.authError).toBeNull();
  });

  it('enters the loading state on signup start', () => {
    const state = authReducer(
      initialState(),
      AuthActions.signupStart({ email: 'a@b.com', password: 'pw' })
    );

    expect(state.loading).toBe(true);
    expect(state.authError).toBeNull();
  });

  it('stores the authenticated user and stops loading on success', () => {
    const loading = authReducer(
      initialState(),
      AuthActions.loginStart({ email: 'a@b.com', password: 'pw' })
    );

    const state = authReducer(
      loading,
      AuthActions.authenticateSuccess({
        email: 'a@b.com',
        userId: 'uid-1',
        token: 'tok-1',
        expirationDate: futureDate(),
        redirect: true,
      })
    );

    expect(state.user.email).toBe('a@b.com');
    expect(state.user.id).toBe('uid-1');
    expect(state.user.token).toBe('tok-1');
    expect(state.loading).toBe(false);
    expect(state.authError).toBeNull();
  });

  it('records the error and clears the user on failure', () => {
    const state = authReducer(
      initialState(),
      AuthActions.authenticateFail({ errorMessage: 'EMAIL_NOT_FOUND' })
    );

    expect(state.authError).toBe('EMAIL_NOT_FOUND');
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('clears the user on logout', () => {
    const loggedIn = authReducer(
      initialState(),
      AuthActions.authenticateSuccess({
        email: 'a@b.com',
        userId: 'uid-1',
        token: 'tok-1',
        expirationDate: futureDate(),
        redirect: true,
      })
    );

    const state = authReducer(loggedIn, AuthActions.logout());

    expect(state.user).toBeNull();
  });

  it('clears a previous error without logging the user out', () => {
    const failed = authReducer(
      initialState(),
      AuthActions.authenticateFail({ errorMessage: 'INVALID_PASSWORD' })
    );

    const state = authReducer(failed, AuthActions.clearError());

    expect(state.authError).toBeNull();
  });
});
