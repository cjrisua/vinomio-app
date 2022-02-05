import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantDialogComponent } from './merchant-dialog.component';

describe('MerchantDialogComponent', () => {
  let component: MerchantDialogComponent;
  let fixture: ComponentFixture<MerchantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
