import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EetatstockComponent } from './eetatstock.component';

describe('EetatstockComponent', () => {
  let component: EetatstockComponent;
  let fixture: ComponentFixture<EetatstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EetatstockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EetatstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
