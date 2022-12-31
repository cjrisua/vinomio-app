import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegionFormComponent } from './admin-region-form.component';

describe('AdminRegionFormComponent', () => {
  let component: AdminRegionFormComponent;
  let fixture: ComponentFixture<AdminRegionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
