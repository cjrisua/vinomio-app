import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineReviewListComponent } from './wine-review-list.component';

describe('WineReviewListComponent', () => {
  let component: WineReviewListComponent;
  let fixture: ComponentFixture<WineReviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineReviewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
