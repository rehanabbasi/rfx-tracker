import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrStatusModalComponent } from './ur-status-modal.component';

describe('UrStatusModalComponent', () => {
  let component: UrStatusModalComponent;
  let fixture: ComponentFixture<UrStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
