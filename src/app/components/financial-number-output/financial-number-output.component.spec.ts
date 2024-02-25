import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FinancialNumberOutputComponent } from './financial-number-output.component';


describe('FinancialNumberOutputComponent', () => {
  let component: FinancialNumberOutputComponent;
  let fixture: ComponentFixture<FinancialNumberOutputComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialNumberOutputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinancialNumberOutputComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should handle invalid input', () => {
    component.input = 'invalid';
    expect(component.input).toBe('invalid');
  });

  it('should navigate to input page on edit', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.handlEdit();
    expect(navigateSpy).toHaveBeenCalledWith(['/input'], { state: { input: component.input } });
  });

  it('should format number', () => {
    component.input = '1234567.89';
    fixture.detectChanges();
    const formatted = fixture.nativeElement.querySelector('.container').textContent;
    expect(formatted).toContain('$1,234,567.89');
  });

});