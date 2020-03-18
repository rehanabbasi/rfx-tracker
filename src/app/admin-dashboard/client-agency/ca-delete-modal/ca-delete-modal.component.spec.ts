import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaDeleteModalComponent } from './ca-delete-modal.component';

describe('CaDeleteModalComponent', () => {
  let component: CaDeleteModalComponent;
  let fixture: ComponentFixture<CaDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaDeleteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
