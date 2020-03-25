import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrFormModalComponent } from './usr-form-modal.component';

describe('UsrFormModalComponent', () => {
  let component: UsrFormModalComponent;
  let fixture: ComponentFixture<UsrFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
