import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDocComponent } from './main-doc.component';

describe('MainDocComponent', () => {
  let component: MainDocComponent;
  let fixture: ComponentFixture<MainDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
