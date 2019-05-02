import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuardPageGuard } from './auth-guard-page.guard';

describe('AuthGuardPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardPageGuard]
    });
  });

  it('should ...', inject([AuthGuardPageGuard], (guard: AuthGuardPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
