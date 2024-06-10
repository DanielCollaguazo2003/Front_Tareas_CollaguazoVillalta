import { TestBed } from '@angular/core/testing';

import { ModalEtiquetaService } from './modal-etiqueta.service';

describe('ModalEtiquetaService', () => {
  let service: ModalEtiquetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalEtiquetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
