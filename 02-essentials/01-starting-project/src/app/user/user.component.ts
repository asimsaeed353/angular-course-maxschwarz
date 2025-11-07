import { Component, computed, Input, input} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  // @Input({required: true}) avatar!: string;
  // @Input({required: true}) name!: string;

  // @Input is a decorator 
  // input() is a function

  // setting inputs with input()
  avatar = input.required(); 
  name = input.required(); 

  imagePath = computed(() => {
    return "assets/users/" + this.avatar();
  });
  
  // * we do not need exclamation with the propery name because technically the 'avatar' and 'name' now have initial values assigned to them which are these signal inputs and since the signals are data container they internally hold some value and those internal values will be the actual input values

  // * name and avatar now has become signals and in component we now access these inputs as 'name()' and not 'name'

  // * these input signals are read only, which means that the value of these inputs will only change when the value is given from the component markup. and you can not set the value of these inputs inside the components class where inputs are registered i.e. in .ts file. 
  // * Reason ? since with signals, angular manages subscriptions and track changes and updates UI. so the signal has to be changed from the outside and it will not be efficient if it can be changed from anywhere

  // * majority of the projects does not use signals yet. they mostly use @Input

  // - avatar = input(); // define an input 
  // - avatar = input(''); // you can pass any initial value to the input 
  // - avatar = input<string>(); // you can define the type of the input 
  // - avatar = input.required(); // you can make it required but then you can not assign any initial value to the input and it has to be passed to the component as attribute
  // - avatar = input.required<string>(); 

  // image path getter
  // get imagePath() {
  //   return "assets/users/" + this.avatar;
  // }

  // define a function that handles the event (the name of the function may start with 'on')
  onClickUser() {
    this.avatar = 'one';
   }

}
