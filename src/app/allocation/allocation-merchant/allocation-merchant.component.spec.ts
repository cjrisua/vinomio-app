import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationMerchantComponent } from './allocation-merchant.component';

describe('AllocationMerchantComponent', () => {
  let component: AllocationMerchantComponent;
  let fixture: ComponentFixture<AllocationMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationMerchantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
