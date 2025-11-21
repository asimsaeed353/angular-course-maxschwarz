import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private destroyRef = inject(DestroyRef);

  // in order to store the value of the email so user does not has to enter the email again 
  // get hold of the form element 
  private form = viewChild.required<NgForm>('form');

  /* the form will be rendered after the component has fully initialized, */
  constructor() {
    /* Register a callback to be invoked the next time the application finishes rendering */
    afterNextRender(() => {
      const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
        next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }))
      });
      /* this observable will emit new value everytime the value of the form changes (i.e. with every key stroke) */
      /* debounceTime(500) keep the value only if there's a break of 500ms */

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }
  onSubmitForm(formData: NgForm){

    if(formData.form.invalid){
      return ;
    }

    const email = formData.form.value.email;
    const password = formData.form.value.password;
    console.log(formData);

    formData.form.reset();
  }
}
