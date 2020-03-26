import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcDeleteModalComponent } from './uc-delete-modal.component';

describe('UcDeleteModalComponent', () => {
  let component: UcDeleteModalComponent;
  let fixture: ComponentFixture<UcDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
