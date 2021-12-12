import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMastervarietalFormComponent } from './admin-mastervarietal-form.component';

describe('AdminMastervarietalFormComponent', () => {
  let component: AdminMastervarietalFormComponent;
  let fixture: ComponentFixture<AdminMastervarietalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMastervarietalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMastervarietalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
