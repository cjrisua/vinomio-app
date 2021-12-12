import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVarietyComponent } from './admin-variety.component';

describe('AdminVarietyComponent', () => {
  let component: AdminVarietyComponent;
  let fixture: ComponentFixture<AdminVarietyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVarietyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVarietyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
