import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationMerchantFormComponent } from './allocation-merchant-form.component';

describe('AllocationMerchantFormComponent', () => {
  let component: AllocationMerchantFormComponent;
  let fixture: ComponentFixture<AllocationMerchantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationMerchantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationMerchantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
