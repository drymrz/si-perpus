import { ComponentFixture, TestBed } from '@angular/core/testing';

import { bukulistComponent } from './bukulist.component';

describe('DashboardComponent', () => {
  let component: bukulistComponent;
  let fixture: ComponentFixture<bukulistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [bukulistComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(bukulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
