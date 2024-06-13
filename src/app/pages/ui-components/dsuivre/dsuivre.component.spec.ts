import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsuivreComponent } from './dsuivre.component';

describe('DsuivreComponent', () => {
  let component: DsuivreComponent;
  let fixture: ComponentFixture<DsuivreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsuivreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsuivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
