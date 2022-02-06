import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFormSignupComponent } from './navbar-form-signup.component';

describe('NavbarFormSignupComponent', () => {
  let component: NavbarFormSignupComponent;
  let fixture: ComponentFixture<NavbarFormSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarFormSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarFormSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
