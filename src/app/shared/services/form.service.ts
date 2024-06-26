import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IFormConfig, IFormField } from '../types/IFormConfig.model';
import { EndpointsService } from './endpoints.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private _fb: FormBuilder, private _endpoints: EndpointsService) { }

  public createForm(formConfig: IFormConfig): FormGroup {
    let group: any = {};

    formConfig.fields.forEach(field => {
      let validators = this.getValidators(field);
      let asyncValidators = this.getAsyncValidators(field);
      const state = {
        value: field.value,
        disabled: field.isDisabled
      };
      group[field.key] = [state, validators, asyncValidators];
    });

    return this._fb.group(group);
  }

  private getValidators(field: IFormField) {
    let validators = [];

    if (field.validations) {
      if (field.validations.required) {
        validators.push(Validators.required);
      }
      if (field.validations.minlength) {
        validators.push(Validators.minLength(field.validations.minlength));
      }
      if (field.validations.maxlength) {
        validators.push(Validators.maxLength(field.validations.maxlength));
      }
      if (field.validations.min) {
        validators.push(Validators.min(field.validations.min));
      }
      if (field.validations.max) {
        validators.push(Validators.max(field.validations.max));
      }
      if (field.validations.pattern) {
        validators.push(Validators.pattern(field.validations.pattern));
      }
      if (field.validations.minDate) {
        validators.push(minDateValidator(field.validations.minDate));
      }
    }

    return validators;
  }

  private getAsyncValidators(field: IFormField): AsyncValidatorFn[] {
    let validators = [];
    if (field.asyncValidations) {
      if (field.asyncValidations.uniqueId) {
        validators.push(uniqueUsernameValidator(this._endpoints));
      }
    }
    return validators;
  }
}

export function minDateValidator(minDate: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (!control.value) {
      return null; 
    }

    const inputDate = new Date(control.value);
    if (inputDate < minDate) {
      return {'minDate': {requiredMinDate: minDate, actualDate: inputDate}};
    }

    return null;
  };
}

export function uniqueUsernameValidator(service: EndpointsService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<{[key: string]: any} | null> | Observable<{[key: string]: any} | null> => {
    if (!control.value) {
      return of(null);
    }
    return service.getIdExists(control.value).pipe(
      map(idExists => idExists ? { 'idTaken': true } : null)
    );
  };
}