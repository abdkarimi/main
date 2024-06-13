import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmodifierComponent } from './amodifier.component';

describe('AmodifierComponent', () => {
  let component: AmodifierComponent;
  let fixture: ComponentFixture<AmodifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmodifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmodifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
