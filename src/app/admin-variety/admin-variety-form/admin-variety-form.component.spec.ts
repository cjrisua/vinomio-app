import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVarietyFormComponent } from './admin-variety-form.component';

describe('AdminVarietyFormComponent', () => {
  let component: AdminVarietyFormComponent;
  let fixture: ComponentFixture<AdminVarietyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVarietyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVarietyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
