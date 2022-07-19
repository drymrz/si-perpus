import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailbukuComponent } from './detailbuku.component';

describe('DetailbukuComponent', () => {
  let component: DetailbukuComponent;
  let fixture: ComponentFixture<DetailbukuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailbukuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailbukuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
