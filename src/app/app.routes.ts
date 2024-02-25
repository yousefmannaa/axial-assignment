import { Routes } from '@angular/router';
import { FinancialNumberInputComponent } from './components/financial-number-input/financial-number-input.component';
import { FinancialNumberOutputComponent } from './components/financial-number-output/financial-number-output.component';

export const routes: Routes = [
  { path: 'input', component: FinancialNumberInputComponent },
  { path: 'output', component: FinancialNumberOutputComponent},
  { path: '', redirectTo: 'input', pathMatch: 'full' },
];
