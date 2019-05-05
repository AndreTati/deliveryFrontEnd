import { TestBed } from '@angular/core/testing';

import { ArticuloCategoriaService } from './articulo-categoria.service';

describe('ArticuloCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticuloCategoriaService = TestBed.get(ArticuloCategoriaService);
    expect(service).toBeTruthy();
  });
});
