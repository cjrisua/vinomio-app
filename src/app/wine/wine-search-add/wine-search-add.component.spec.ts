import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineSearchAddComponent } from './wine-search-add.component';

describe('WineSearchAddComponent', () => {
  let component: WineSearchAddComponent;
  let fixture: ComponentFixture<WineSearchAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineSearchAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineSearchAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
