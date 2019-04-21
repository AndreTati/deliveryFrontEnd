import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulocategoriaComponent } from './articulocategoria.component';

describe('ArticulocategoriaComponent', () => {
  let component: ArticulocategoriaComponent;
  let fixture: ComponentFixture<ArticulocategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticulocategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulocategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
