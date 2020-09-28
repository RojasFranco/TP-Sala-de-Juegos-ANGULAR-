import { TestBed } from '@angular/core/testing';

import { RegistroJugadoresService } from './registro-jugadores.service';

describe('RegistroJugadoresService', () => {
  let service: RegistroJugadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroJugadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
