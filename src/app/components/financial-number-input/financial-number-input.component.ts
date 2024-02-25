import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FINANCIAL_NUMBER_REGEX } from '../../shared/constants';

@Component({
  selector: 'app-financial-number-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './financial-number-input.component.html'
})
export class FinancialNumberInputComponent implements OnInit {
  form: FormGroup;
  inputControl: FormControl;
  error = '';

  constructor(private router: Router) {
    this.inputControl = new FormControl('', [
      Validators.required,
      Validators.pattern(FINANCIAL_NUMBER_REGEX)
    ]);
    this.form = new FormGroup({
      input: this.inputControl
    });
  }

  ngOnInit(): void {
    this.form.patchValue({input: history.state?.input || ''});
  }

  onChange = () => {
    this.error = '';
  }
  
  onSubmit = () => {
    if (this.form.valid) {
      this.router.navigate(['/output'], { state: { input: this.inputControl.value } });
    } else {
      this.error = 'Input is invalid. Please enter a valid financial number with optional k, m, or b suffix (e.g. 250k, 10m or .5b)';
    }
  }
}