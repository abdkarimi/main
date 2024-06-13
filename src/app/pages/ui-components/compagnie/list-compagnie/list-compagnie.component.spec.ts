import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompagnieComponent } from './list-compagnie.component';

describe('ListCompagnieComponent', () => {
  let component: ListCompagnieComponent;
  let fixture: ComponentFixture<ListCompagnieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompagnieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCompagnieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
