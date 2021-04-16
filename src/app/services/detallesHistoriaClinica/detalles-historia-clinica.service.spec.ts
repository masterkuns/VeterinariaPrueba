import { TestBed } from '@angular/core/testing';

import { DetallesHistoriaClinicaService } from './detalles-historia-clinica.service';

describe('DetallesHistoriaClinicaService', () => {
  let service: DetallesHistoriaClinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallesHistoriaClinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
