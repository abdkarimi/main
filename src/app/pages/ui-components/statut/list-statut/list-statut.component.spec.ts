import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStatutComponent } from './list-statut.component';

describe('ListStatutComponent', () => {
  let component: ListStatutComponent;
  let fixture: ComponentFixture<ListStatutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStatutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
