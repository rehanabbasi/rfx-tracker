import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuDeleteModalComponent } from './bu-delete-modal.component';

describe('BuDeleteModalComponent', () => {
  let component: BuDeleteModalComponent;
  let fixture: ComponentFixture<BuDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
