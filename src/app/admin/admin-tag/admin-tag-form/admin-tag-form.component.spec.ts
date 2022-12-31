import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTagFormComponent } from './admin-tag-form.component';

describe('AdminTagFormComponent', () => {
  let component: AdminTagFormComponent;
  let fixture: ComponentFixture<AdminTagFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTagFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTagFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
