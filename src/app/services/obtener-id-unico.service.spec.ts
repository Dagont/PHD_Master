import { TestBed } from '@angular/core/testing';

import { ObtenerIdUnicoService } from './obtener-id-unico.service';

describe('ObtenerIdUnicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerIdUnicoService = TestBed.get(ObtenerIdUnicoService);
    expect(service).toBeTruthy();
  });
});
