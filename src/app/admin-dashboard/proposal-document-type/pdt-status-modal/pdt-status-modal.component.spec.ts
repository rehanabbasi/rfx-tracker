import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdtStatusModalComponent } from './pdt-status-modal.component';

describe('PdtStatusModalComponent', () => {
  let component: PdtStatusModalComponent;
  let fixture: ComponentFixture<PdtStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdtStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdtStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
