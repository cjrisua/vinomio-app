import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineReviewComponent } from './wine-review.component';

describe('WineReviewComponent', () => {
  let component: WineReviewComponent;
  let fixture: ComponentFixture<WineReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
