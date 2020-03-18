import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaFormModalComponent } from './ca-form-modal.component';

describe('CaFormModalComponent', () => {
  let component: CaFormModalComponent;
  let fixture: ComponentFixture<CaFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
