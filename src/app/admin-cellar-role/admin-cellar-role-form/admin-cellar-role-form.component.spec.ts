import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCellarRoleFormComponent } from './admin-cellar-role-form.component';

describe('AdminCellarRoleFormComponent', () => {
  let component: AdminCellarRoleFormComponent;
  let fixture: ComponentFixture<AdminCellarRoleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCellarRoleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCellarRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
