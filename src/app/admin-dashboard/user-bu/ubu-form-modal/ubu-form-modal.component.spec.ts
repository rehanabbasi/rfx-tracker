import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbuFormModalComponent } from './ubu-form-modal.component';

describe('UbuFormModalComponent', () => {
  let component: UbuFormModalComponent;
  let fixture: ComponentFixture<UbuFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbuFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbuFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
