import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  
  // we want to pass these values to the calculate function in the parent component i.e. AppComponent. For that, we are going to output an event 
  @Output() calculate = new EventEmitter<{
    initialInvestment: number,
    expectedReturn: number,
    annualInvestment: number,
    duration: number,
  }>();

  initialInvestment = '0';
  annualInvestment = '0';
  expectedReturn = '5';
  duration = '10';

  onFormSubmission(){
    this.calculate.emit({
      initialInvestment: +this.initialInvestment,
      duration: +this.duration,
      expectedReturn: +this.expectedReturn,
      annualInvestment: +this.annualInvestment,
    });
    // in typescript, if you want to convert string value into integer, place a '+' before it
  }
}
