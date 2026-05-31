import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

import { ApiService } from '../services/api.service'

export class CustomValidators {
  static _api: ApiService
  static email: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  static domain: RegExp = /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/i
  static domainWithComma: RegExp = /^(\s*(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+)\s*)(,\s*(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+)\s*)*$/i
  static numberOnly: RegExp = /^[0-9]*$/i
  static decimalNumber: RegExp = /^\d+(\.\d+)?$/
  static desimalNumberOnly: RegExp = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/ //   ***include number and decimal number like 1, 20, 34.5, 3.2, ...
  // static ip: RegExp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  static ip: RegExp = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\/([1-2][0-9]|3[0-2]|[0-9]))?$/
  static ipWithComma: RegExp = /^(\s*(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\s*)(,\s*(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\s*)*$/
  static framedRoute: RegExp = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\/([1-2][0-9]|3[0-2]|[0-9]))$/
  static ip_range: RegExp = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(0)(\/([1-2][0-9]|3[0-2]|[0-9]))$/
  static msisdn: RegExp = /^989\d{9}$/
  static msisdnForSearch: RegExp = /^(989|09|9)(\d{2})\d{7}$/
  static phoneNumber: RegExp = /^(989|09|9)\d{9}$/
  static password: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  static persianCharactersOnly: RegExp = /^[\u0600-\u06FF\s]+$/
  static englishCharactersOnly: RegExp = /^[A-Za-z\s]+$/
  static englishCharactersAndNumberOnly: RegExp = /^[A-Za-z0-9]+$/

  constructor(apiService: ApiService) {
    CustomValidators._api = apiService
  }

  static matchPasswords(AC: AbstractControl, passwordControlName: string, confirmPasswordControlName: string): void {
    let password: string = AC.get(passwordControlName).value
    let confirmPassword: string = AC.get(confirmPasswordControlName).value

    if (password != confirmPassword) AC.get(confirmPasswordControlName).setErrors({ match_error: true })
  }

  static nationalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const melliCode = control.value
      if (melliCode) {
        const isValid = this.checkNationalCode(melliCode)
        return isValid ? null : { invalidNationalCode: true }
      }
      return null
    }
  }

  static checkNationalCode(code: string): boolean {
    if (!/^\d{10}$/.test(code)) return false

    const invalidCodes = ['0000000000', '1111111111', '2222222222', '3333333333', '4444444444', '5555555555', '6666666666', '7777777777', '8888888888', '9999999999']
    if (invalidCodes.includes(code)) return false

    const check = +code[9]
    const sum = code
      .split('')
      .slice(0, 9)
      .reduce((total, digit, index) => total + +digit * (10 - index), 0)
    const remainder = sum % 11

    return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder)
  }

  static requiredNonZero(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    if (value === null || value === undefined || value === 0 || value === '') {
      return { requiredNonZero: true }
    }
    return null
  }

  public domainCheck(control: FormControl): Observable<ValidationErrors | null> {
    let req: Observable<any> = <Observable<any>>CustomValidators._api.set('store/domain_check', 'POST', {
      body: { name: control.value }
    })
    return req.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      map((res: { status: string }) => {
        return res.status == 'valid' ? null : { invalidDomain: true }
      })
    )
    // TODO: Handle multi requests
    // return Promise.resolve({ error: true } || null)
    // return new Promise((resolve, reject) => {});
  }

  static iranLandlineValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value
      if (!value) return null

      const digits = String(value).replace(/\D/g, '')

      const regex = /^0\d{10}$/
      const valid = regex.test(digits)

      return valid ? null : { invalidIranLandline: true }
    }
  }

  static minLessThanMax(minKey: string, maxKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const minControl = group.get(minKey)
      const maxControl = group.get(maxKey)

      if (!minControl || !maxControl) return null

      const min = minControl.value
      const max = maxControl.value

      if (min != null && max != null && min !== '' && max !== '') {
        if (Number(min) > Number(max)) {
          // ❌ Add error to max control
          maxControl.setErrors({ ...(maxControl.errors || {}), minGreaterThanMax: true })
          return { minGreaterThanMax: true }
        } else {
          // ✅ Remove previous error if condition fixed
          if (maxControl.errors?.['minGreaterThanMax']) {
            const { minGreaterThanMax, ...otherErrors } = maxControl.errors
            maxControl.setErrors(Object.keys(otherErrors).length ? otherErrors : null)
          }
        }
      }

      return null
    }
  }
}
