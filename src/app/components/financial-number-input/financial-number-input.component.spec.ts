import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FinancialNumberInputComponent } from './financial-number-input.component';
import { Router } from '@angular/router';

describe('FinancialNumberInputComponent', () => {
  let component: FinancialNumberInputComponent;
  let fixture: ComponentFixture<FinancialNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, RouterTestingModule, FinancialNumberInputComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    window.history.pushState({ input: '100k' }, '', '');
    fixture = TestBed.createComponent(FinancialNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with one input control', () => {
    expect(component.form).toBeDefined();
    expect(component.inputControl).toBeDefined();
    expect(component.form.contains('input')).toBeTrue();
  });

  it('should initialize the input value from the history state', () => {
    spyOn(history, 'state').and.returnValue({ input: '100k' });
    component.ngOnInit();
    expect(component.inputControl.value).toEqual('100k');
  });

  it('should reset the error message on input change', () => {
    component.error = 'Some error';
    component.onChange();
    expect(component.error).toEqual('');
  });

  it('should validate the input value using the financial number regex', () => {
    component.inputControl.setValue('abc');
    expect(component.inputControl.valid).toBeFalse();
    component.inputControl.setValue('250k');
    expect(component.inputControl.valid).toBeTrue();
    component.inputControl.setValue('10m');
    expect(component.inputControl.valid).toBeTrue();
    component.inputControl.setValue('.5b');
    expect(component.inputControl.valid).toBeTrue();
  });

  it('should navigate to the output page with the input value as state on submit if the form is valid', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    component.inputControl.setValue('250k');
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/output'], { state: { input: '250k' } });
  });

  it('should set the error message on submit if the form is invalid', () => {
    component.inputControl.setValue('abc');
    component.onSubmit();
    expect(component.error).toEqual('Input is invalid. Please enter a valid financial number with optional k, m, or b suffix (e.g. 250k, 10m or .5b)');
  });
});

