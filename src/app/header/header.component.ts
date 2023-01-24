import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  collapsed = true;
  @Output() featEmitter = new EventEmitter<string>();

  loadFeature(feature: string) {
    this.featEmitter.emit(feature);
  }
}
