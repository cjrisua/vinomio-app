import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVintageComponent } from './admin-vintage.component';

describe('AdminVintageComponent', () => {
  let component: AdminVintageComponent;
  let fixture: ComponentFixture<AdminVintageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVintageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVintageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
