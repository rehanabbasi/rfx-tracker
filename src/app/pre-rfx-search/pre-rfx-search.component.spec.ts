import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRfxSearchComponent } from './pre-rfx-search.component';

describe('PreRfxSearchComponent', () => {
  let component: PreRfxSearchComponent;
  let fixture: ComponentFixture<PreRfxSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRfxSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRfxSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
