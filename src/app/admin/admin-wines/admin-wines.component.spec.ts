import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWinesComponent } from './admin-wines.component';

describe('AdminWinesComponent', () => {
  let component: AdminWinesComponent;
  let fixture: ComponentFixture<AdminWinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
