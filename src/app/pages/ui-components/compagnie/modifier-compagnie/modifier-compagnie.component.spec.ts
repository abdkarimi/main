import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCompagnieComponent } from './modifier-compagnie.component';

describe('ModifierCompagnieComponent', () => {
  let component: ModifierCompagnieComponent;
  let fixture: ComponentFixture<ModifierCompagnieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierCompagnieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierCompagnieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
