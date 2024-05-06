import { TestBed } from '@angular/core/testing';

import { FormService, minDateValidator, uniqueUsernameValidator } from './form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EndpointsService } from './endpoints.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IFormConfig } from '../types/IFormConfig.model';
import { of } from 'rxjs';
import { mockFormConfigWithValue } from '../mocks/FormConfig.mock';

describe('FormService', () => {
  let service: FormService;
  let endpointsSpy: jasmine.SpyObj<EndpointsService>;

  beforeEach(() => {
    const formBuilder = new FormBuilder();
    endpointsSpy = jasmine.createSpyObj('EndpointsService', ['getIdExists']);
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FormService,
        { provide: FormBuilder, useValue: formBuilder },
        { provide: EndpointsService, useValue: endpointsSpy }
      ]
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a form group based on the provided form configuration', () => {
    const formConfig: IFormConfig = mockFormConfigWithValue;
    
    endpointsSpy.getIdExists.and.returnValue(of(true));
  
    const formGroup = service.createForm(formConfig);
    expect(formGroup instanceof FormGroup).toBeTrue();
    expect(formGroup.contains('id')).toBeTrue();
    expect(formGroup.contains('name')).toBeTrue();
    expect(formGroup.contains('description')).toBeTrue();
    expect(formGroup.contains('logo')).toBeTrue();
    expect(formGroup.contains('dateRelease')).toBeTrue();
    expect(formGroup.contains('dateRevision')).toBeTrue();
    expect(formGroup.get('id')?.status).toBe('INVALID');
  
    formGroup.get('id')?.setValue('testuser');
    formGroup.updateValueAndValidity();
  });
  
  it('should apply minDateValidator correctly', () => {
    const control = new FormControl('2020-01-01');
    const validator = minDateValidator(new Date('2021-01-01'));
    const result = validator(control);
  
    expect(result).toEqual({ 'minDate': { requiredMinDate: new Date('2021-01-01'), actualDate: new Date('2020-01-01') }});
  });
});
