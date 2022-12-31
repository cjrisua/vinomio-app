import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WineSearchViewComponent } from './wine-search-view.component';

describe('WineSearchViewComponent', () => {
  let component: WineSearchViewComponent;
  let fixture: ComponentFixture<WineSearchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WineSearchViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WineSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
