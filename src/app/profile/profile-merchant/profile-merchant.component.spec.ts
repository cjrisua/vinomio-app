import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMerchantComponent } from './profile-merchant.component';

describe('ProfileMerchantComponent', () => {
  let component: ProfileMerchantComponent;
  let fixture: ComponentFixture<ProfileMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMerchantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
