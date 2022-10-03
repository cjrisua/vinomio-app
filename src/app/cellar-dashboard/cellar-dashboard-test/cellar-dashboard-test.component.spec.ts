import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarDashboardTestComponent } from './cellar-dashboard-test.component';

describe('CellarDashboardTestComponent', () => {
  let component: CellarDashboardTestComponent;
  let fixture: ComponentFixture<CellarDashboardTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarDashboardTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarDashboardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
