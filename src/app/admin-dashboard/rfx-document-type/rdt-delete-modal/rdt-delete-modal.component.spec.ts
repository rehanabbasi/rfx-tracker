import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RdtDeleteModalComponent } from './rdt-delete-modal.component';

describe('RdtDeleteModalComponent', () => {
  let component: RdtDeleteModalComponent;
  let fixture: ComponentFixture<RdtDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RdtDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RdtDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
