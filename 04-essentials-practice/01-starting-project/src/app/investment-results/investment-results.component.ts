import { Component, inject, computed } from '@angular/core';
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

  results = computed(() => this.investmentService.resultData());
  // -------- alternatively ----------
  // results = this.investmentService.resultData().asReadonly();

  // the above code will return a 'read-only' signal which make sure that the data(result) is not accidentally changed form outside of the service which might happen if you directly interact with the 'resultData()'

}
