import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { vi } from 'vitest';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

/**
 * Boots the root component through the real AppModule, so an upgrade that breaks
 * dependency injection, the NgRx wiring or the template scope fails here rather
 * than in the browser. AppModule is imported rather than re-declaring the
 * component, because templates are AOT-compiled and need their real module scope
 * to resolve <app-header> and <router-outlet>.
 */
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('instantiates with the store injected', () => {
    // detectChanges is required even here: it runs ngOnInit on the child
    // header, without which its ngOnDestroy unsubscribes an undefined
    // subscription during fixture cleanup.
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('dispatches autoLogin on init', () => {
    const store = TestBed.inject(Store);
    const dispatch = vi.spyOn(store, 'dispatch');

    fixture.detectChanges();

    expect(dispatch).toHaveBeenCalledWith({ type: '[Auth] Auto Login' });
  });

  it('renders the header and the router outlet', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-header')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });
});
