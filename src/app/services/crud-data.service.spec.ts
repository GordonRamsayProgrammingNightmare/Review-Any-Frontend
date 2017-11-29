import { TestBed, inject } from '@angular/core/testing';

import { CrudDataService } from './crud-data.service';

describe('CrudDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudDataService]
    });
  });

  it('should be created', inject([CrudDataService], (service: CrudDataService) => {
    expect(service).toBeTruthy();
  }));
});
