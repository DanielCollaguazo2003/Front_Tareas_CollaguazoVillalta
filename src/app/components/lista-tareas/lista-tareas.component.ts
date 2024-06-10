import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Tarea } from '../../domain/tarea';
import { NavigationExtras, Router } from '@angular/router';
import { TareaService } from 'src/app/services/tarea.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css']
})
export class ListaTareasComponent implements OnInit, OnDestroy {
  /* Variables */
    /* Las variables necesarias para la lsita seran una lista y el scroll */
  listaTareas: Tarea[] = [];
  private scrollSubscription: Subscription | undefined;

  constructor(
    private elementRef: ElementRef,
     private router: Router,
     private renderer: Renderer2,
     private _tareaService: TareaService){
    //  this._tareaFirebaseService.getAll().subscribe(data => {
    //    this.listaTareas = data;
    //    this.listaTareas = this.listaTareas.filter(tarea => tarea.fecha);
    //    this.listaTareas.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    //  });;
  }

  getTareasLocal(): Tarea[] | null {
    const tareasLocal = localStorage.getItem('tareas');
    return tareasLocal ? JSON.parse(tareasLocal) : null;
  }

  saveTareasLocal(tareas: Tarea[]): void {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  /* Ver la tarea */
    /* Metodo para ver la tarea mediante una naveegacion del Router con su UID correspondiente */
  verTarea(id: string){
    this.router.navigate(['/formulario', id]);

  }

  /* Metodo para eliminar una tarea */
  eliminarTarea(tarea: Tarea){
    // this._tareaFirebaseService.delete(tarea);
  }

  /* Metodo para estar pendiente del boton del scroll y desplazar la pagina */
  ngOnInit() {
    this.scrollSubscription = this._tareaService.scrollEvent$.subscribe(() => {
      this.scrollIntoView();
    });
  }

  /* Metodo para destruir la suscripcion y sea mas eficiente el programa */
  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  /* Este sera el metodo que hace el scroll en si en la pagina */
  scrollIntoView() {
    if (this.elementRef.nativeElement) {
      this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
