import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrDeleteModalComponent } from './vr-delete-modal.component';

describe('VrDeleteModalComponent', () => {
  let component: VrDeleteModalComponent;
  let fixture: ComponentFixture<VrDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
