import { TestBed } from '@angular/core/testing';

import { AutenticarSesionService } from './autenticar-sesion.service';

describe('AutenticarSesionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutenticarSesionService = TestBed.get(AutenticarSesionService);
    expect(service).toBeTruthy();
  });
});
