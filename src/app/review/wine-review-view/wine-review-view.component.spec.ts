import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineReviewViewComponent } from './wine-review-view.component';

describe('WineReviewViewComponent', () => {
  let component: WineReviewViewComponent;
  let fixture: ComponentFixture<WineReviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineReviewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineReviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
