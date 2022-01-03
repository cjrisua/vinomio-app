import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarDashboardComponent } from './cellar-dashboard.component';

describe('CellarDashboardComponent', () => {
  let component: CellarDashboardComponent;
  let fixture: ComponentFixture<CellarDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
