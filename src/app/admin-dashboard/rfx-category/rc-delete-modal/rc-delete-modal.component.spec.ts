import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcDeleteModalComponent } from './rc-delete-modal.component';

describe('RcDeleteModalComponent', () => {
  let component: RcDeleteModalComponent;
  let fixture: ComponentFixture<RcDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
