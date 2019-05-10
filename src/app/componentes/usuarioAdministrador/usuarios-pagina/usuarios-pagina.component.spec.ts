import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosPaginaComponent } from './usuarios-pagina.component';

describe('UsuariosPaginaComponent', () => {
  let component: UsuariosPaginaComponent;
  let fixture: ComponentFixture<UsuariosPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariosPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
