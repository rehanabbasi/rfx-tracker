import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdtDeleteModalComponent } from './pdt-delete-modal.component';

describe('PdtDeleteModalComponent', () => {
  let component: PdtDeleteModalComponent;
  let fixture: ComponentFixture<PdtDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdtDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdtDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
