import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarAddBulkTableComponent } from './cellar-add-bulk-table.component';

describe('CellarAddBulkTableComponent', () => {
  let component: CellarAddBulkTableComponent;
  let fixture: ComponentFixture<CellarAddBulkTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarAddBulkTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarAddBulkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
