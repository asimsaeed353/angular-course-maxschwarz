import { Component, EventEmitter, Input, Output, output} from '@angular/core';

// since the type defnintion can be long, store data model in a separate file and then import in this file.
// indicate that this is data model file by writing 'type' before it 
import {type User} from './user.model';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // instead of  three inputs, you can take just only one user object 
  @Input({required: true}) user!: User;

  @Output() select = new EventEmitter<string>();

  // highlight the selected user 
  @Input({required: true}) selected!: boolean;

  // image path getter
  get imagePath() {
    return "assets/users/" + this.user.avatar;
  }

  // define a function that handles the event (the name of the function may start with 'on')
  onClickUser() {
    this.select.emit(this.user.id)
   }

}
