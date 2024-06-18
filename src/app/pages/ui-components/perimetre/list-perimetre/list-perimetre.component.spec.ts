import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPerimetreComponent } from './list-perimetre.component';

describe('ListPerimetreComponent', () => {
  let component: ListPerimetreComponent;
  let fixture: ComponentFixture<ListPerimetreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPerimetreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPerimetreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
