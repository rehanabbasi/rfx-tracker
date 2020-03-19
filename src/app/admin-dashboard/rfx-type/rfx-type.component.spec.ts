import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfxTypeComponent } from './rfx-type.component';

describe('RfxTypeComponent', () => {
  let component: RfxTypeComponent;
  let fixture: ComponentFixture<RfxTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfxTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfxTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
