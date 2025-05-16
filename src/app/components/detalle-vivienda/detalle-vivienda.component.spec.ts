import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleViviendaComponent } from './detalle-vivienda.component';

describe('DetalleViviendaComponent', () => {
  let component: DetalleViviendaComponent;
  let fixture: ComponentFixture<DetalleViviendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleViviendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleViviendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
