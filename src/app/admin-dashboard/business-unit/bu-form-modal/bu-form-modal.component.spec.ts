import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuFormModalComponent } from './bu-form-modal.component';

describe('BuFormModalComponent', () => {
  let component: BuFormModalComponent;
  let fixture: ComponentFixture<BuFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
