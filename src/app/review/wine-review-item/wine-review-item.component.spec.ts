import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineReviewItemComponent } from './wine-review-item.component';

describe('WineReviewItemComponent', () => {
  let component: WineReviewItemComponent;
  let fixture: ComponentFixture<WineReviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineReviewItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineReviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
