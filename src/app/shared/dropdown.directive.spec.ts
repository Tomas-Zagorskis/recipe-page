import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDirective } from './dropdown.directive';

@Component({
  template: `
    <div class="dropdown" appDropdown>
      <a class="dropdown-toggle" role="button">Manage</a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item">Save</a></li>
      </ul>
    </div>
    <button id="outside" type="button">outside</button>
  `,
  standalone: false,
})
class HostComponent {}

/**
 * Bootstrap 5 reveals a dropdown via `.show` on the `.dropdown-menu` itself,
 * where Bootstrap 3 keyed off `.open` on the parent. These cover that contract
 * so a future CSS framework change cannot silently break both dropdowns.
 */
describe('DropdownDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, DropdownDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  function host(): HTMLElement {
    return fixture.nativeElement.querySelector('.dropdown');
  }

  function menu(): HTMLElement {
    return fixture.nativeElement.querySelector('.dropdown-menu');
  }

  it('starts closed', () => {
    expect(host().classList).not.toContain('show');
    expect(menu().classList).not.toContain('show');
  });

  it('marks both the host and the menu as shown when the toggle is clicked', () => {
    host().querySelector('a').click();
    fixture.detectChanges();

    expect(host().classList).toContain('show');
    expect(menu().classList).toContain('show');
  });

  it('closes again on a second click inside', () => {
    const toggle = host().querySelector('a') as HTMLElement;

    toggle.click();
    fixture.detectChanges();
    toggle.click();
    fixture.detectChanges();

    expect(host().classList).not.toContain('show');
    expect(menu().classList).not.toContain('show');
  });

  it('closes when a click lands outside the dropdown', () => {
    host().querySelector('a').click();
    fixture.detectChanges();

    (
      fixture.nativeElement.querySelector('#outside') as HTMLElement
    ).click();
    fixture.detectChanges();

    expect(host().classList).not.toContain('show');
    expect(menu().classList).not.toContain('show');
  });
});
