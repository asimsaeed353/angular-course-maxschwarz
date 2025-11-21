import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';

// define a custom Validator 
function mustContainQuestionMark(control: AbstractControl) {
  if(control.value.includes('?')){
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

// async validator to check if the email is already registered
function emailIsUnique(control: AbstractControl) {
  if(control.value !== 'test@example.com'){
    // Email is unique
    return of(null);
  }

  // Email is not unique  
  // of() returns an observable that emits some data
  return of( { notUnique: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    })
  });

  get emailIsInvalid() {
    return this.form.controls.email.touched &&
     this.form.controls.email.dirty &&
      this.form.controls.email.invalid ;
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched &&
     this.form.controls.password.dirty &&
      this.form.controls.password.invalid ;
  }

  onSubmit() {
    console.log(this.form);

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword)
  }
}