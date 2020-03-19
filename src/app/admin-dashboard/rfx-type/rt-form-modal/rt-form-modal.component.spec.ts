import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtFormModalComponent } from './rt-form-modal.component';

describe('RtFormModalComponent', () => {
  let component: RtFormModalComponent;
  let fixture: ComponentFixture<RtFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
