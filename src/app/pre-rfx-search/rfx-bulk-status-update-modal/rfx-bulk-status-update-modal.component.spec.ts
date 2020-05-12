import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfxBulkStatusUpdateModalComponent } from './rfx-bulk-status-update-modal.component';

describe('RfxBulkStatusUpdateModalComponent', () => {
  let component: RfxBulkStatusUpdateModalComponent;
  let fixture: ComponentFixture<RfxBulkStatusUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfxBulkStatusUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfxBulkStatusUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
