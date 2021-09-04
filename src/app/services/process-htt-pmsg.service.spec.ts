import { TestBed } from '@angular/core/testing';

import { ProcessHttPMsgService } from './process-htt-pmsg.service';

describe('ProcessHttPMsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessHttPMsgService = TestBed.get(ProcessHttPMsgService);
    expect(service).toBeTruthy();
  });
});
