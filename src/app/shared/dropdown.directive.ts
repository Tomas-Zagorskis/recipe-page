import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: false,
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen: boolean = false;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target as Node)
      ? !this.isOpen
      : false;
    // Bootstrap 5 reveals the menu via `.show` on the menu itself, unlike
    // Bootstrap 3 which keyed off `.open` on this host element.
    this.elRef.nativeElement
      .querySelector('.dropdown-menu')
      ?.classList.toggle('show', this.isOpen);
  }
}
