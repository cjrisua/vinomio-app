import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMastervarietalComponent } from './admin-mastervarietal.component';

describe('AdminMastervarietalComponent', () => {
  let component: AdminMastervarietalComponent;
  let fixture: ComponentFixture<AdminMastervarietalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMastervarietalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMastervarietalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
