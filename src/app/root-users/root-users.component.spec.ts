import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootUsersComponent } from './root-users.component';

describe('RootUsersComponent', () => {
  let component: RootUsersComponent;
  let fixture: ComponentFixture<RootUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RootUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
