import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPeopleFormComponent } from './admin-people-form.component';

describe('AdminPeopleFormComponent', () => {
  let component: AdminPeopleFormComponent;
  let fixture: ComponentFixture<AdminPeopleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPeopleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPeopleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
