import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetablirComponent } from './detablir.component';

describe('DetablirComponent', () => {
  let component: DetablirComponent;
  let fixture: ComponentFixture<DetablirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetablirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetablirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
