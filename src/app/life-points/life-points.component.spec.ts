import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifePointsComponent } from './life-points.component';

describe('LifePointsComponent', () => {
  let component: LifePointsComponent;
  let fixture: ComponentFixture<LifePointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifePointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
