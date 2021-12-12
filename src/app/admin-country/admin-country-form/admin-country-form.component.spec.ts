import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCountryFormComponent } from './admin-country-form.component';

describe('AdminCountryFormComponent', () => {
  let component: AdminCountryFormComponent;
  let fixture: ComponentFixture<AdminCountryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCountryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCountryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
