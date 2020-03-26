import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBuComponent } from './user-bu.component';

describe('UserBuComponent', () => {
  let component: UserBuComponent;
  let fixture: ComponentFixture<UserBuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
