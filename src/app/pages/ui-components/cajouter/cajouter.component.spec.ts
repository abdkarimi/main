import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajouterComponent } from './cajouter.component';

describe('CajouterComponent', () => {
  let component: CajouterComponent;
  let fixture: ComponentFixture<CajouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
