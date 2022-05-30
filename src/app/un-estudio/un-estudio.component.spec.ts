import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnEstudioComponent } from './un-estudio.component';

describe('UnEstudioComponent', () => {
  let component: UnEstudioComponent;
  let fixture: ComponentFixture<UnEstudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnEstudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
