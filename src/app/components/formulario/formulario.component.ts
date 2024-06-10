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

  /*Declaramos las variables necesarias para nustro componente las cuales son tres lisas, un booleano un imput y una tarea*/
  tarea?: Tarea;
  @Input() etiquetas?: string[];
  modalSwitch: boolean = false;
  listaEtiquetas: Etiqueta[] = [];
  listaEtiquetasActu: Etiqueta[] = [];
  listaTareas: Tarea[] = [];

  /*Declaramos los servicios que nos ayudaran para los metodos de la funcionalidad*/
  constructor(
    private router: Router,
    private _modalEtiquetaService: ModalEtiquetaService,
    private route: ActivatedRoute,
    private _tareaService: TareaService
  ) {
    /*Obtenemos las etiquetas de nuestro servicio para poder trabajar con ellas*/

    this.listaEtiquetas = _modalEtiquetaService.getEtiquetas();
  }

  ngOnInit(): void {
    this._modalEtiquetaService.$modal.subscribe((valor) => { this.modalSwitch = valor });
    this.route.params.subscribe(params => {
      const tareaId = params['id'];
    });
  }

  /* Vamos a trabajar con formularios reactivos por lo que la forma de recoger datos y validar datos es mediante el formGroup, FormControl y Validator */
    /* dentro de este mandamos parametros que no son ingresados por el usuario como el UID, la lista de etiquetas se maneja de otra manera asi que se
    lemanda un metodo que ayuda a recoger las etiuetas para luego subirlas en forma de array */
  form = new FormGroup({
    uid: new FormControl(1, []),
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl<Date | null>(null, [Validators.required]),
    contenido: new FormControl('', [Validators.required]),
    etiquetas: new FormControl(this._modalEtiquetaService.getEtiquetas(), []),
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
      // const tarea: Tarea = <Tarea>(this.form.getRawValue());
      // tarea.etiquetas = this.listaEtiquetas;
      // this._tareaFirebaseService.save(tarea);

      this.form.reset();

      this._modalEtiquetaService.limpiarEtiquetasSeleccionadas();
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
