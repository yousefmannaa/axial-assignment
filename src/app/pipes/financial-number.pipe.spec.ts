import { FinancialNumberPipe } from './financial-number.pipe';

describe('FinancialNumberPipe', () => {

  let pipe: FinancialNumberPipe;

  beforeEach(() => {
    pipe = new FinancialNumberPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for empty string input', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should format number with k suffix correctly', () => {
    expect(pipe.transform('1000k')).toBe('$1,000,000');
  });

  it('should format number with m suffix correctly', () => {
    expect(pipe.transform('1m')).toBe('$1,000,000');
  });

  it('should format number with b suffix correctly', () => {
    expect(pipe.transform('1b')).toBe('$1,000,000,000');
  });

  it('should return number for invalid suffix', () => {
    expect(pipe.transform('1000x')).toBe('1000x');
  });

  it('should return number for invalid format', () => {
    expect(pipe.transform('abc')).toBe('abc');
  });

});
