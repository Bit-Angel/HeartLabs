import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootDocsComponent } from './root-docs.component';

describe('RootDocsComponent', () => {
  let component: RootDocsComponent;
  let fixture: ComponentFixture<RootDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
