import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtDeleteModalComponent } from './rt-delete-modal.component';

describe('RtDeleteModalComponent', () => {
  let component: RtDeleteModalComponent;
  let fixture: ComponentFixture<RtDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
