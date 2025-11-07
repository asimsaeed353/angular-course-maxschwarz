import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  @Input({required: true}) avatar!: string;
  @Input({required: true}) name!: string;

  // the '!' with property name is to tell typescript that we are essentially going to set the value of this property from outside (which is not always the case) and that we know we have not initialized this property with any value. 
  // If you do not pass any value to the property in the markup, there will be error but it wall cause issues in the UI. so, you have to mark properties as required so it shows error in the code and does not execute code.
  // To mark a property as required, pass configuration option {required: true} to the @Input decorator

  // image path getter
  get imagePath() {
    return "assets/users/" + this.avatar;
  }

  // define a function that handles the event (the name of the function may start with 'on')
  onClickUser() { }

}
