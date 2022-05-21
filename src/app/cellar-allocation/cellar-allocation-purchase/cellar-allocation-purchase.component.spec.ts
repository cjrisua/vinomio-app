import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAllocationPurchaseComponent } from './cellar-allocation-purchase.component';

describe('CellarAllocationPurchaseComponent', () => {
  let component: CellarAllocationPurchaseComponent;
  let fixture: ComponentFixture<CellarAllocationPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAllocationPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAllocationPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
