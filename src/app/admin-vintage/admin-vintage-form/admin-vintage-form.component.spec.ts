import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVintageFormComponent } from './admin-vintage-form.component';

describe('AdminVintageFormComponent', () => {
  let component: AdminVintageFormComponent;
  let fixture: ComponentFixture<AdminVintageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVintageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVintageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
