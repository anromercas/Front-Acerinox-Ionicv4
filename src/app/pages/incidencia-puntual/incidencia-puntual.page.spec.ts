import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenciaPuntualPage } from './incidencia-puntual.page';

describe('IncidenciaPuntualPage', () => {
  let component: IncidenciaPuntualPage;
  let fixture: ComponentFixture<IncidenciaPuntualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidenciaPuntualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenciaPuntualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
