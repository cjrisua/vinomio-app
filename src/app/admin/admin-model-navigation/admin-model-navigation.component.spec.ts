import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModelNavigationComponent } from './admin-model-navigation.component';

describe('AdminModelNavigationComponent', () => {
  let component: AdminModelNavigationComponent;
  let fixture: ComponentFixture<AdminModelNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModelNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModelNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
