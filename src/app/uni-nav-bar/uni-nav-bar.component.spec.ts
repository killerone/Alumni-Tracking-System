import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniNavBarComponent } from './uni-nav-bar.component';

describe('UniNavBarComponent', () => {
  let component: UniNavBarComponent;
  let fixture: ComponentFixture<UniNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
