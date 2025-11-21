import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

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

/* detached from the component's lifecycle, the following code will be executed when this file is executed */
/* will work fine for only client side rendering, if you have server-side rendering, this might not be the good approach */
let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if(savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
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

  /* save the form data so user does not have to enter the email again */
  ngOnInit() {

    /* save form data */
    // const savedForm = window.localStorage.getItem('saved-login-form');

    // if(savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   // this.form.controls.email.setValue(loadedForm.email);
    //   /* alternatively, with reactive forms */
    //   this.form.patchValue({
    //     email: loadedForm.email,
    //   })
    // }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email})),
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    console.log(this.form);

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword)
  }
}