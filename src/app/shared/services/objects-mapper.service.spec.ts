import { TestBed } from '@angular/core/testing';

import { ObjectsMapperService } from './objects-mapper.service';

describe('ObjectsMapperService', () => {
  let service: ObjectsMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectsMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
