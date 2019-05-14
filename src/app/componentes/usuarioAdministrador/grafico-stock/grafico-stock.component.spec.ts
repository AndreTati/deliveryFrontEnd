import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoStockComponent } from './grafico-stock.component';

describe('GraficoStockComponent', () => {
  let component: GraficoStockComponent;
  let fixture: ComponentFixture<GraficoStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
