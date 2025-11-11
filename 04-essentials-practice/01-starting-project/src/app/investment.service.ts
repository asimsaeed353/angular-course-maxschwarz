import { Injectable, signal } from '@angular/core';

import type { InvestmentInput } from './investment-input.model';

@Injectable({providedIn: 'root'})
export class InvestmentService {
    // declare a property to access resultedData 
    resultData = signal<{
        year: number,
        interest: number,
        valueEndOfYear: number,
        annualInvestment: number,
        totalInterest: number,
        totalAmountInvested: number,
    }[] | undefined>(undefined) ;
    calculateInvestmentResults(data: InvestmentInput) {

    // de structure the data variable to extract variables individually
    const {initialInvestment, expectedReturn, annualInvestment, duration} = data;

    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
        const year = i + 1;
        const interestEarnedInYear = investmentValue * (expectedReturn / 100);
        investmentValue += interestEarnedInYear + annualInvestment;
        const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
        annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
        });
    }

    this.resultData.set(annualData);
    // this.resultData = annualData;
    }
}