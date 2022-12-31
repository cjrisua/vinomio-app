import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationViewComponent } from './allocation-view.component';

describe('AllocationViewComponent', () => {
  let component: AllocationViewComponent;
  let fixture: ComponentFixture<AllocationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
