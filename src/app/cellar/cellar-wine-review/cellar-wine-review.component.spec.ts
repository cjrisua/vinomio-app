import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarWineReviewComponent } from './cellar-wine-review.component';

describe('CellarWineReviewComponent', () => {
  let component: CellarWineReviewComponent;
  let fixture: ComponentFixture<CellarWineReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarWineReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarWineReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
