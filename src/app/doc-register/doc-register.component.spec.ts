import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRegisterComponent } from './doc-register.component';

describe('DocRegisterComponent', () => {
  let component: DocRegisterComponent;
  let fixture: ComponentFixture<DocRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
