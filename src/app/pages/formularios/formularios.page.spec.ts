import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosPage } from './formularios.page';

describe('FormulariosPage', () => {
  let component: FormulariosPage;
  let fixture: ComponentFixture<FormulariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulariosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
