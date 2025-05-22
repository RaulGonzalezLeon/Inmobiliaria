import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirContactoComponent } from './anadir-contacto.component';

describe('AnadirContactoComponent', () => {
  let component: AnadirContactoComponent;
  let fixture: ComponentFixture<AnadirContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirContactoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
