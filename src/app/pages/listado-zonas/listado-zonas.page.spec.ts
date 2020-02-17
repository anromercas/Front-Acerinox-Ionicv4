import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoZonasPage } from './listado-zonas.page';

describe('ListadoZonasPage', () => {
  let component: ListadoZonasPage;
  let fixture: ComponentFixture<ListadoZonasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoZonasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoZonasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
