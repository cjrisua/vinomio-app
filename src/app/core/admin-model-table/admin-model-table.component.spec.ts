import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModelTableComponent } from './admin-model-table.component';

describe('AdminModelTableComponent', () => {
  let component: AdminModelTableComponent;
  let fixture: ComponentFixture<AdminModelTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModelTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
