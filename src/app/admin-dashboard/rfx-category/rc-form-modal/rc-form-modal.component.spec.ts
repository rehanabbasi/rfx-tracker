import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcFormModalComponent } from './rc-form-modal.component';

describe('RcFormModalComponent', () => {
  let component: RcFormModalComponent;
  let fixture: ComponentFixture<RcFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
