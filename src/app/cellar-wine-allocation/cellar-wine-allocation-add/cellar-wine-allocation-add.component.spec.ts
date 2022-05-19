import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarWineAllocationAddComponent } from './cellar-wine-allocation-add.component';

describe('CellarWineAllocationAddComponent', () => {
  let component: CellarWineAllocationAddComponent;
  let fixture: ComponentFixture<CellarWineAllocationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarWineAllocationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarWineAllocationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
