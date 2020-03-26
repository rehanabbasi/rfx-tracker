import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCatComponent } from './user-cat.component';

describe('UserCatComponent', () => {
  let component: UserCatComponent;
  let fixture: ComponentFixture<UserCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
