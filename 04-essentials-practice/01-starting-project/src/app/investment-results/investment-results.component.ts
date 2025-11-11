import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  // expose the result data in the component using the injected service

  // get the instance of the service class
  private investmentService = inject(InvestmentService);

  get results() {
    return this.investmentService.resultData;
  }
}
