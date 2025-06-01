import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerContactosComponent } from './ver-contactos.component';

describe('VerContactosComponent', () => {
  let component: VerContactosComponent;
  let fixture: ComponentFixture<VerContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerContactosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
