import { TestBed } from '@angular/core/testing';

import { RegistroResultadosJuegosService } from './registro-resultados-juegos.service';

describe('RegistroResultadosJuegosService', () => {
  let service: RegistroResultadosJuegosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroResultadosJuegosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
