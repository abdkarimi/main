import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTCarburantComponent } from './list-tcarburant.component';

describe('ListTCarburantComponent', () => {
  let component: ListTCarburantComponent;
  let fixture: ComponentFixture<ListTCarburantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTCarburantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTCarburantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
