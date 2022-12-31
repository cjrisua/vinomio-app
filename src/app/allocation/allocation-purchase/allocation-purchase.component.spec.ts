import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationPurchaseComponent } from './allocation-purchase.component';

describe('AllocationPurchaseComponent', () => {
  let component: AllocationPurchaseComponent;
  let fixture: ComponentFixture<AllocationPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
