import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Etiqueta } from 'src/app/domain/etiqueta';
import { Tarea } from 'src/app/domain/tarea';
import { ModalEtiquetaService } from 'src/app/services/modal-etiqueta.service';
import { TareaService } from 'src/app/services/tarea.service';
import { ListaTareasComponent } from '../lista-tareas/lista-tareas.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  tarea?: Tarea;
  @Input() etiquetas?: string[];
  modalSwitch: boolean = false;
  listaEtiquetas: Etiqueta[] = [];
  listaEtiquetasActu: Etiqueta[] = [];
  listaTareas: Tarea[] = [];

  constructor(
    private router: Router,
    private _modalEtiquetaService: ModalEtiquetaService,
    private route: ActivatedRoute,
    private _tareaService: TareaService
  ) {

    this.listaEtiquetas = _modalEtiquetaService.getEtiquetas();
  }

  ngOnInit(): void {
    this._modalEtiquetaService.$modal.subscribe((valor) => { this.modalSwitch = valor });
    this.route.params.subscribe(params => {
      const tareaId = params['id'];
    });

  }

  form = new FormGroup({
    id: new FormControl(0, []),
    name: new FormControl('', [Validators.required]),
    time: new FormControl<Date | null>(null, [Validators.required]),
    contenido: new FormControl('', [Validators.required]),
    tags: new FormControl(this._modalEtiquetaService.getEtiquetas(), []),
  })

  /* Metodo para agragr una tarea */
    /* Dentro de este metodo primero validamos si es una actualizacion, luego obtenemos la tarea del FormGruop y guardamos en el firebase*/
  agregartarea() {
    if (!this.tarea) {
      if (this.form.invalid) {
        alert('La informacion ingresada es incorrecta o incompleta');
        return
      }
      this.listaEtiquetas = this._modalEtiquetaService.getEtiquetas();
      const tarea: Tarea = <Tarea><unknown>(this.form.getRawValue());
      console.log(tarea)
      tarea.tags = this.listaEtiquetas;
      tarea.id = 0;
      console.log(tarea)
      this._tareaService.saveTarea(tarea).subscribe(data => {
        this.ngOnInit();
      });
      this.form.reset();

      this._modalEtiquetaService.limpiarEtiquetasSeleccionadas();

      window.location.reload();

    }else{
      alert('Esta en la actualizando una tarea')
    }
  }

  /* Metodo para eliminar una etiqueta */
    /* Para eliminar una etiqueta solo recibimos la etiqueta a liminar y mediante el servicio la quitamos y volvemos a cargar la lista*/
  eliminarEtiqueta(etiqueta: Etiqueta) {
    this._modalEtiquetaService.eliminarEtiquetaSeleccionada(etiqueta);
    this.listaEtiquetas = this._modalEtiquetaService.getEtiquetas();
  }

  /* Metodo para actualizar una tarea */
    /* Es similar al agrgar, tendra una validacion y dentro de este obtendremos el formulario y en el firebase solo mandamos a actualizar enves de guardar */
  actualizarTarea() {
    if (this.tarea) {
      // this.tarea = <Tarea>(this.form.getRawValue());
      // this.tarea.etiquetas = this._modalEtiquetaService.getEtiquetas();
      // this._tareaFirebaseService.update(this.tarea);
      this.listaEtiquetas = [];
      this._modalEtiquetaService.setEtiquetas(this.listaEtiquetas);
      this.form.reset();
      this.router.navigate(['/home']);
    } else {
      alert('No existe ninguna tarea para actualizar')
    }
    this.tarea = undefined;
  }

  /* Metodo para abrir el modal */
    /* Al ser un metodo que se va a estar observando va a pasar cosas por lo que solo cambiamos una variable para cerrar el modal */
  openModal() {
    this.modalSwitch = true;
  }

  /* Metodo para bajar hacia la lista */
    /* Dentro de este metodo solo llamamos a un metodo del servicio  */
  scrollToList() {
    this._tareaService.triggerScroll();
  }
}
