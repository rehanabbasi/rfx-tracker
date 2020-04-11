import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRfxAdvancedSearchModalComponent } from './pre-rfx-advanced-search-modal.component';

describe('PreRfxAdvancedSearchModalComponent', () => {
  let component: PreRfxAdvancedSearchModalComponent;
  let fixture: ComponentFixture<PreRfxAdvancedSearchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreRfxAdvancedSearchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRfxAdvancedSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
