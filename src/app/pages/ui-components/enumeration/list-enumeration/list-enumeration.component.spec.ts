import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnumerationComponent } from './list-enumeration.component';

describe('ListEnumerationComponent', () => {
  let component: ListEnumerationComponent;
  let fixture: ComponentFixture<ListEnumerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEnumerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEnumerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
