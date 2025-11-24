import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  /* set up reactive form */
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }), 
    password: new FormGroup({
      password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
    }),
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    address: new FormGroup({
      street: new FormControl('', { validators: [Validators.required] }),
      number: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', { validators: [Validators.required] }),
      city: new FormControl('', { validators: [Validators.required] }),
    }),
    // drop-down input type
    role: new FormControl<'student' | 'teacher' | 'founder' | 'employee' | 'other'>('other', { validators: [Validators.required] }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      // equals the number of maximum values that you expect 
    ]),
    // checkbox input type
    agree: new FormControl(false, { validators: [Validators.required ] })
  })

  onSubmit() {
    console.log(this.form);
    
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    
    // console.log(enteredEmail);
    // console.log(enteredPassword);

    // this.onReset();
  }

  onReset() {
    this.form.reset();
  }
}
