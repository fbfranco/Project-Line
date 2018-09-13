/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SendTokenService } from './sendToken.service';

describe('Service: SendToken', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendTokenService]
    });
  });

  it('should ...', inject([SendTokenService], (service: SendTokenService) => {
    expect(service).toBeTruthy();
  }));
});
