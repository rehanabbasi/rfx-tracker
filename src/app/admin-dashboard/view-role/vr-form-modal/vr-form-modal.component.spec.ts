import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrFormModalComponent } from './vr-form-modal.component';

describe('VrFormModalComponent', () => {
  let component: VrFormModalComponent;
  let fixture: ComponentFixture<VrFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
