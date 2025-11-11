import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {

  initialInvestment = signal('0');
  annualInvestment = signal('0');
  expectedReturn = signal('5');
  duration = signal('10');

  // inject InvestmentService Dependency - initialize an instance of this class
  // the following line will tell the Angular that it should inject the instance of this InvestmentService class as value for this investmentService parameter into this constructor function 
  // and we need to store this parameter in a property of this class so we can access or manipulate it inside the class
  constructor(private investmentService: InvestmentService) {}

  onFormSubmission(){
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment(),
      duration: +this.duration(),
      expectedReturn: +this.expectedReturn(),
      annualInvestment: +this.annualInvestment(),
    });
    // in typescript, if you want to convert string value into integer, place a '+' before it

    // reset form values
    this.initialInvestment.set('0');
    this.annualInvestment.set('0');
    this.expectedReturn.set('5');
    this.duration.set('10');
  }
}
