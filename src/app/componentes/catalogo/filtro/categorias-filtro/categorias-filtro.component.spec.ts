import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasFiltroComponent } from './categorias-filtro.component';

describe('CategoriasFiltroComponent', () => {
  let component: CategoriasFiltroComponent;
  let fixture: ComponentFixture<CategoriasFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
