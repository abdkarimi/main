import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsaisirComponent } from './asaisir.component';

describe('AsaisirComponent', () => {
  let component: AsaisirComponent;
  let fixture: ComponentFixture<AsaisirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsaisirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsaisirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
