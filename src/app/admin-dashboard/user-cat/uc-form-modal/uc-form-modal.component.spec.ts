import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcFormModalComponent } from './uc-form-modal.component';

describe('UcFormModalComponent', () => {
  let component: UcFormModalComponent;
  let fixture: ComponentFixture<UcFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
