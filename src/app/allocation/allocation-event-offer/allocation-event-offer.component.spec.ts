import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationEventOfferComponent } from './allocation-event-offer.component';

describe('AllocationEventOfferComponent', () => {
  let component: AllocationEventOfferComponent;
  let fixture: ComponentFixture<AllocationEventOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationEventOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationEventOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
