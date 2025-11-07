import { Component, EventEmitter, Input, Output, output} from '@angular/core';

// define you own object type 
// 1. type
/*
type User = {
  id: string, 
  name: string,
  avatar: string
};
*/

// 2. Interface 
interface User {
  id: string, 
  name: string,
  avatar: string  
};

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // instead of  three inputs, you can take just only one user object 
  @Input({required: true}) user!: User;

  @Output() select = new EventEmitter<string>();

  // image path getter
  get imagePath() {
    return "assets/users/" + this.user.avatar;
  }

  // define a function that handles the event (the name of the function may start with 'on')
  onClickUser() {
    this.select.emit(this.user.id)
   }

}
