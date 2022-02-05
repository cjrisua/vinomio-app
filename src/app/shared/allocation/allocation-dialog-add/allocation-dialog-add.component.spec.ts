import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationDialogAddComponent } from './allocation-dialog-add.component';

describe('AllocationDialogAddComponent', () => {
  let component: AllocationDialogAddComponent;
  let fixture: ComponentFixture<AllocationDialogAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationDialogAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
