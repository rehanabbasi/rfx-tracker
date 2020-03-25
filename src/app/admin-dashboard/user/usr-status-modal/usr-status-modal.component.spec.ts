import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrStatusModalComponent } from './usr-status-modal.component';

describe('UsrStatusModalComponent', () => {
  let component: UsrStatusModalComponent;
  let fixture: ComponentFixture<UsrStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
