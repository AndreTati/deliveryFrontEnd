import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatocategoriaComponent } from './platocategoria.component';

describe('PlatocategoriaComponent', () => {
  let component: PlatocategoriaComponent;
  let fixture: ComponentFixture<PlatocategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatocategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatocategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
