import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;

  constructor(private shoppingService: ShoppingListService) {}

  onAddItem() {
    const ingName: string = this.nameInput.nativeElement.value;
    const ingAmount: number = Number(this.amountInput.nativeElement.value);
    const newIngredient = new Ingredient(ingName, ingAmount);

    this.shoppingService.addIngredient([newIngredient]);
  }
}
