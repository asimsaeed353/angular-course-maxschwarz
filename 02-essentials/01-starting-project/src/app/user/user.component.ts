import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({required: true}) id!: string;
  @Input({required: true}) avatar!: string;
  @Input({required: true}) name!: string;

  // define a custom event to output any component and it must be assigned a new instance of EventEmitter
  @Output() select = new EventEmitter;
  
  // on any event emit some value in this eventEmitter

  // image path getter
  get imagePath() {
    return "assets/users/" + this.avatar;
  }

  // define a function that handles the event (the name of the function may start with 'on')
  onClickUser() {
    this.select.emit(this.id)
   }

}
