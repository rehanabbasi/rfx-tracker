import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuStatusModalComponent } from './bu-status-modal.component';

describe('BuStatusModalComponent', () => {
  let component: BuStatusModalComponent;
  let fixture: ComponentFixture<BuStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
