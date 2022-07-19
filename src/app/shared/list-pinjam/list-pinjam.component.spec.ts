import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPinjamComponent } from './list-pinjam.component';

describe('ListPinjamComponent', () => {
  let component: ListPinjamComponent;
  let fixture: ComponentFixture<ListPinjamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPinjamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPinjamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
