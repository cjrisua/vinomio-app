import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCellarRoleComponent } from './admin-cellar-role.component';

describe('AdminCellarRoleComponent', () => {
  let component: AdminCellarRoleComponent;
  let fixture: ComponentFixture<AdminCellarRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCellarRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCellarRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
