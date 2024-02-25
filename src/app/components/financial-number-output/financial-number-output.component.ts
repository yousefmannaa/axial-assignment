import { Component, OnInit } from '@angular/core';
import { FinancialNumberPipe } from "../../pipes/financial-number.pipe";
import { Router } from "@angular/router";

@Component({
    selector: 'app-financial-number-output',
    standalone: true,
    templateUrl: './financial-number-output.component.html',
    imports: [FinancialNumberPipe]
})
export class FinancialNumberOutputComponent implements OnInit {
  input = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.input = history.state?.input;
  }

  handlEdit = () => {
    this.router.navigate(['/input'], {state: {input: this.input}});
  }
}