import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfxCategoryComponent } from './rfx-category.component';

describe('RfxCategoryComponent', () => {
  let component: RfxCategoryComponent;
  let fixture: ComponentFixture<RfxCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfxCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfxCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
