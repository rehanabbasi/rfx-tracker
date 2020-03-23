import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDocumentTypeComponent } from './proposal-document-type.component';

describe('ProposalDocumentTypeComponent', () => {
  let component: ProposalDocumentTypeComponent;
  let fixture: ComponentFixture<ProposalDocumentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalDocumentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
