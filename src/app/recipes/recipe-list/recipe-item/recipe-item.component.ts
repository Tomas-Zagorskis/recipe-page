import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css'],
    standalone: false
})
export class RecipeItemComponent {
  @Input() recipeItem: Recipe;
  @Input() index: number;
}
