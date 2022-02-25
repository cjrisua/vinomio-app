import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAllocationMerchantComponent } from './cellar-allocation-merchant.component';

describe('CellarAllocationMerchantComponent', () => {
  let component: CellarAllocationMerchantComponent;
  let fixture: ComponentFixture<CellarAllocationMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAllocationMerchantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAllocationMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
