import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAgencyComponent } from './client-agency.component';

describe('ClientAgencyComponent', () => {
  let component: ClientAgencyComponent;
  let fixture: ComponentFixture<ClientAgencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAgencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAgencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
