import { Component } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test recipe', 'https://thomascattlecompany.com/cdn/shop/articles/20240408152714-img_8556.jpg?v=1729021399&width=1100'),
    new Recipe('A Test Recipe', 'This is simply a test recipe', 'https://thomascattlecompany.com/cdn/shop/articles/20240408152714-img_8556.jpg?v=1729021399&width=1100'),
  ];
}
