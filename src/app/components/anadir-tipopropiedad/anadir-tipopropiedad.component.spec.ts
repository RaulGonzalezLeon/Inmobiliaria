import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirTipopropiedadComponent } from './anadir-tipopropiedad.component';

describe('AnadirTipopropiedadComponent', () => {
  let component: AnadirTipopropiedadComponent;
  let fixture: ComponentFixture<AnadirTipopropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirTipopropiedadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirTipopropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
