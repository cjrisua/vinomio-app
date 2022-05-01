import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAllocationEventOfferComponent } from './cellar-allocation-event-offer.component';

describe('CellarAllocationEventOfferComponent', () => {
  let component: CellarAllocationEventOfferComponent;
  let fixture: ComponentFixture<CellarAllocationEventOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAllocationEventOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAllocationEventOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
