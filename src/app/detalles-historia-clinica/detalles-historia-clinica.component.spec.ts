import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesHistoriaClinicaComponent } from './detalles-historia-clinica.component';

describe('DetallesHistoriaClinicaComponent', () => {
  let component: DetallesHistoriaClinicaComponent;
  let fixture: ComponentFixture<DetallesHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
