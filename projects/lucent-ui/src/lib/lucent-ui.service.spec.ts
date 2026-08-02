import { TestBed } from '@angular/core/testing';

import { LucentUiService } from './lucent-ui.service';

describe('LucentUiService', () => {
  let service: LucentUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LucentUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
