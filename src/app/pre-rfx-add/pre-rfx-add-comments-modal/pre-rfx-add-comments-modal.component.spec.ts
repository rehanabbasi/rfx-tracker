import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRfxAddCommentsModalComponent } from './pre-rfx-add-comments-modal.component';

describe('PreRfxAddCommentsModalComponent', () => {
  let component: PreRfxAddCommentsModalComponent;
  let fixture: ComponentFixture<PreRfxAddCommentsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRfxAddCommentsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRfxAddCommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
