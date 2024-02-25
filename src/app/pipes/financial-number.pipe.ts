import { Pipe, PipeTransform } from '@angular/core';
import { FINANCIAL_NUMBER_REGEX } from '../shared/constants';

@Pipe({
  name: 'financialNumber',
  standalone: true
})
export class FinancialNumberPipe implements PipeTransform {
  suffixes: { [key: string]: number } = {
    k: 1000,
    m: 1000000,
    b: 1000000000
  };
  formatterForUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 });

  transform(value: string): unknown {
    if (!value) return value;
    const match = value.match(FINANCIAL_NUMBER_REGEX);
    if (!match) return value;
    const number = parseFloat(match[1]);
    const suffix = match[2]?.toLowerCase();
    return this.formatterForUSD.format(this.suffixes.hasOwnProperty(suffix) ? number * this.suffixes[suffix] : Number(value));
  }

}
