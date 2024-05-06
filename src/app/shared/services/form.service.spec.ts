import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
