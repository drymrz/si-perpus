import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpinjamanComponent } from './detailpinjaman.component';

describe('DetailpinjamanComponent', () => {
  let component: DetailpinjamanComponent;
  let fixture: ComponentFixture<DetailpinjamanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailpinjamanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpinjamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
