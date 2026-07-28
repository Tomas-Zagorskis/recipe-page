import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import * as fromApp from './store/app.reducer';

/**
 * Boots the root component against the real store so an upgrade that breaks
 * dependency injection or the NgRx wiring fails here rather than in the browser.
 * Child components are stubbed out via NO_ERRORS_SCHEMA to keep the assertion
 * on the DI graph.
 */
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [StoreModule.forRoot(fromApp.appReducers)],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('instantiates with the store injected', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('dispatches autoLogin once on init', () => {
    const store = TestBed.inject(Store);
    const dispatch = spyOn(store, 'dispatch').and.callThrough();

    fixture.detectChanges();

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: '[Auth] Auto Login' });
  });

  it('renders the router outlet', () => {
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('router-outlet')
    ).toBeTruthy();
  });
});
