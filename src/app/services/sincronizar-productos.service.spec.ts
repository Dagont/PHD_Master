import { TestBed } from '@angular/core/testing';

import { SincronizarProductosService } from './sincronizar-productos.service';

describe('SincronizarProductosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SincronizarProductosService = TestBed.get(SincronizarProductosService);
    expect(service).toBeTruthy();
  });
});
