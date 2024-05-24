import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";


export class CustomValidators {

  static pattern(pattern: RegExp, error: ValidationErrors): ValidatorFn {
    return patternValidator(pattern, error);
  }

  static confirmPassword(control: AbstractControl): ValidationErrors | null {
    return confirmPasswordValidator(control);
  }
}

export function patternValidator(pattern: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isPresent(Validators.required(control))) {
      return null;
    }

    return pattern.test(control.value) ? null : error;
  };


}


export function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.parent?.get('password')?.value;
  const passwordConfirmed = control.value;
  if (!passwordConfirmed) {
    return null;
  }
  return password !== passwordConfirmed ? {confirmPassword: true} : null;
}

export function isPresent(obj: any): boolean {
  return obj !== undefined && obj !== null;
}
