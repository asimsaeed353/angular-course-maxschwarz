import { Component } from '@angular/core';
import { SafeLinkDirective } from '../safe-link.directive';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports: [SafeLinkDirective], // import the directive to be able to use it in the template
})
export class LearningResourcesComponent {}
