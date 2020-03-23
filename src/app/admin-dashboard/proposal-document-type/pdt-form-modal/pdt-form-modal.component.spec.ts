import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdtFormModalComponent } from './pdt-form-modal.component';

describe('PdtFormModalComponent', () => {
  let component: PdtFormModalComponent;
  let fixture: ComponentFixture<PdtFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdtFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdtFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
