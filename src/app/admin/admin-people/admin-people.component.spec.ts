import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPeopleComponent } from './admin-people.component';

describe('AdminPeopleComponent', () => {
  let component: AdminPeopleComponent;
  let fixture: ComponentFixture<AdminPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
