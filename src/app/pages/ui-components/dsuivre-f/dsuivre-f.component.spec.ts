import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsuivreFComponent } from './dsuivre-f.component';

describe('DsuivreFComponent', () => {
  let component: DsuivreFComponent;
  let fixture: ComponentFixture<DsuivreFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsuivreFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsuivreFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
