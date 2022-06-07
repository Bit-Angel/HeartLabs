import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraLateralRootComponent } from './barra-lateral-root.component';

describe('BarraLateralRootComponent', () => {
  let component: BarraLateralRootComponent;
  let fixture: ComponentFixture<BarraLateralRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraLateralRootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraLateralRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
