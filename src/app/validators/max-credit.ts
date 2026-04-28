import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxCreditValidator(getMax: () => number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const max = getMax();

    if (!value || !max) return null;

    return value > max ? { exceedsCredit: true } : null;
  };
}
