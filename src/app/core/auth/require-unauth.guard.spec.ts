import { TestBed, async, inject } from '@angular/core/testing';

import { RequireUnauthGuard } from './require-unauth.guard';

describe('RequireUnauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequireUnauthGuard]
    });
  });

  it('should ...', inject([RequireUnauthGuard], (guard: RequireUnauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
