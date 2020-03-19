import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdtFormModalComponent } from './rdt-form-modal.component';

describe('RdtFormModalComponent', () => {
  let component: RdtFormModalComponent;
  let fixture: ComponentFixture<RdtFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdtFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdtFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
