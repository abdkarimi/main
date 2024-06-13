import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UajouterComponent } from './uajouter.component';

describe('UajouterComponent', () => {
  let component: UajouterComponent;
  let fixture: ComponentFixture<UajouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UajouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UajouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
