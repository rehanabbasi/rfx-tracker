import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrFormModalComponent } from './ur-form-modal.component';

describe('UrFormModalComponent', () => {
  let component: UrFormModalComponent;
  let fixture: ComponentFixture<UrFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
