import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmodifierComponent } from './umodifier.component';

describe('UmodifierComponent', () => {
  let component: UmodifierComponent;
  let fixture: ComponentFixture<UmodifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmodifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UmodifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
