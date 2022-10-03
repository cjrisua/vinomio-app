import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarDashboardWineReviewsComponent } from './cellar-dashboard-wine-reviews.component';

describe('CellarDashboardWineReviewsComponent', () => {
  let component: CellarDashboardWineReviewsComponent;
  let fixture: ComponentFixture<CellarDashboardWineReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarDashboardWineReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarDashboardWineReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
