import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalEtiquetaService } from 'src/app/services/modal-etiqueta.service';
import { Etiqueta } from '../../domain/etiqueta';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-model-etiquetas',
  templateUrl: './model-etiquetas.component.html',
  styleUrls: ['./model-etiquetas.component.css']
})
export class ModelEtiquetasComponent {
  /* Variables */
    /* Las variables a usar son la el modal y dos listas para manejar las etiquetas */
  modalSwitch?: boolean;
  listaEtiquetas: Etiqueta[];
  listaEtiquetasActualizar?: Etiqueta[];

  constructor(private _modalEtiquetaService: ModalEtiquetaService, private _tareaService: TareaService) {
    this.listaEtiquetas = _modalEtiquetaService.obtenerTareasLocalStorage();
  }

  /* Metodo para cerrar el modal */
  cerrarModal() {
    this._modalEtiquetaService.$modal.emit(false);
  }

  /* Metetodo del formGruop para manejar la informacion del formulario */
  form = new FormGroup({
    id: new FormControl(this._modalEtiquetaService.obtenerTareasLocalStorage().length, []),
    nombre: new FormControl('', [Validators.required]),
  })

  /* Metodo para agrgar una receta a la lsiat de etiquetas, y al servicio para poder usar en otros componentes */
  agregarEtiqueta() {
    if (this.form.invalid) {
      alert('La informacion ingresada es incorrecta o incompleta');
      return
    }

    const etiqueta: Etiqueta = <Etiqueta>(this.form.getRawValue());
    this._modalEtiquetaService.addEtiqueta(etiqueta);
    this.listaEtiquetas = this._modalEtiquetaService.obtenerTareasLocalStorage();
    this.form.reset();
  }

  /* Metodo para seleccionar la etiqueta y mandarla al servicio para mandarla a otro componente */
  seleccionarEtiqueta(etiqueta: Etiqueta) {
    this._modalEtiquetaService.addEtiqueta(etiqueta);
  }

}
