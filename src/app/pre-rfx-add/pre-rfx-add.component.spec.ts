import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRfxAddComponent } from './pre-rfx-add.component';

describe('PreRfxAddComponent', () => {
  let component: PreRfxAddComponent;
  let fixture: ComponentFixture<PreRfxAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRfxAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRfxAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
