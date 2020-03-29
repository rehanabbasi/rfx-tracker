import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaStatusModalComponent } from './ca-status-modal.component';

describe('CaStatusModalComponent', () => {
  let component: CaStatusModalComponent;
  let fixture: ComponentFixture<CaStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
