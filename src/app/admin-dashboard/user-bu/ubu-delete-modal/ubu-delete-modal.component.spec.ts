import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbuDeleteModalComponent } from './ubu-delete-modal.component';

describe('UbuDeleteModalComponent', () => {
  let component: UbuDeleteModalComponent;
  let fixture: ComponentFixture<UbuDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbuDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbuDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
