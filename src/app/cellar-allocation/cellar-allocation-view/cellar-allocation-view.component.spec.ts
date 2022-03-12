import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAllocationViewComponent } from './cellar-allocation-view.component';

describe('CellarAllocationViewComponent', () => {
  let component: CellarAllocationViewComponent;
  let fixture: ComponentFixture<CellarAllocationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAllocationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAllocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
