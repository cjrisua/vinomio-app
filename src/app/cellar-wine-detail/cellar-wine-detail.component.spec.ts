import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellarWineDetailComponent } from './cellar-wine-detail.component';

describe('CellarWineDetailComponent', () => {
  let component: CellarWineDetailComponent;
  let fixture: ComponentFixture<CellarWineDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellarWineDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellarWineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
