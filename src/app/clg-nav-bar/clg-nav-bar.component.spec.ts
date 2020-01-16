import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClgNavBarComponent } from './clg-nav-bar.component';

describe('ClgNavBarComponent', () => {
  let component: ClgNavBarComponent;
  let fixture: ComponentFixture<ClgNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClgNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClgNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
