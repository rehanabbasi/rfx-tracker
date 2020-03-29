import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdtStatusModalComponent } from './rdt-status-modal.component';

describe('RdtStatusModalComponent', () => {
  let component: RdtStatusModalComponent;
  let fixture: ComponentFixture<RdtStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdtStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdtStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
