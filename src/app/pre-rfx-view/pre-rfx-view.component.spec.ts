import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRfxViewComponent } from './pre-rfx-view.component';

describe('PreRfxViewComponent', () => {
  let component: PreRfxViewComponent;
  let fixture: ComponentFixture<PreRfxViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRfxViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRfxViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
