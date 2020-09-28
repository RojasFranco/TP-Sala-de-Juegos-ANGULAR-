import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAdivinaComponent } from './listado-adivina.component';

describe('ListadoAdivinaComponent', () => {
  let component: ListadoAdivinaComponent;
  let fixture: ComponentFixture<ListadoAdivinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoAdivinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAdivinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
