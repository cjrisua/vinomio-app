import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCellarAddFormComponent } from './profile-cellar-add-form.component';

describe('ProfileCellarAddFormComponent', () => {
  let component: ProfileCellarAddFormComponent;
  let fixture: ComponentFixture<ProfileCellarAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCellarAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCellarAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
