import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfxCommentsModalComponent } from './rfx-comments-modal.component';

describe('RfxCommentsModalComponent', () => {
  let component: RfxCommentsModalComponent;
  let fixture: ComponentFixture<RfxCommentsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfxCommentsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfxCommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
