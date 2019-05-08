import { TestBed } from '@angular/core/testing';

import { PlatoCategoriaService } from './plato-categoria.service';

describe('PlatoCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlatoCategoriaService = TestBed.get(PlatoCategoriaService);
    expect(service).toBeTruthy();
  });
});
