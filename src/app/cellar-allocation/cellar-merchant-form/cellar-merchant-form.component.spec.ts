import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarMerchantFormComponent } from './cellar-merchant-form.component';

describe('CellarMerchantFormComponent', () => {
  let component: CellarMerchantFormComponent;
  let fixture: ComponentFixture<CellarMerchantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarMerchantFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarMerchantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
