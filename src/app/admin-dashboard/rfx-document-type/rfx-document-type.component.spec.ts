import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfxDocumentTypeComponent } from './rfx-document-type.component';

describe('RfxDocumentTypeComponent', () => {
  let component: RfxDocumentTypeComponent;
  let fixture: ComponentFixture<RfxDocumentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfxDocumentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfxDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
