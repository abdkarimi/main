import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmodifierComponent } from './cmodifier.component';

describe('CmodifierComponent', () => {
  let component: CmodifierComponent;
  let fixture: ComponentFixture<CmodifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmodifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmodifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
