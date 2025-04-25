import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirPropiedadComponent } from './anadir-propiedad.component';

describe('AnadirPropiedadComponent', () => {
  let component: AnadirPropiedadComponent;
  let fixture: ComponentFixture<AnadirPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirPropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
