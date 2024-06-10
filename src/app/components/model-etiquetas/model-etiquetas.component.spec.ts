import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEtiquetasComponent } from './model-etiquetas.component';

describe('ModelEtiquetasComponent', () => {
  let component: ModelEtiquetasComponent;
  let fixture: ComponentFixture<ModelEtiquetasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelEtiquetasComponent]
    });
    fixture = TestBed.createComponent(ModelEtiquetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
