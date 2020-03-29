import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcStatusModalComponent } from './rc-status-modal.component';

describe('RcStatusModalComponent', () => {
  let component: RcStatusModalComponent;
  let fixture: ComponentFixture<RcStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
