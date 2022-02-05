import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCellarComponent } from './profile-cellar.component';

describe('ProfileCellarComponent', () => {
  let component: ProfileCellarComponent;
  let fixture: ComponentFixture<ProfileCellarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCellarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCellarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
