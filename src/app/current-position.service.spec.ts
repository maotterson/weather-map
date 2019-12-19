import { TestBed } from '@angular/core/testing';

import { CurrentPositionService } from './current-position.service';

describe('CurrentPositionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentPositionService = TestBed.get(CurrentPositionService);
    expect(service).toBeTruthy();
  });
});
