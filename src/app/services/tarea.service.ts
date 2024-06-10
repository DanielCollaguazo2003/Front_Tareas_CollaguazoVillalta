import { Injectable } from '@angular/core';
import { Tarea } from '../domain/tarea';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  /* Variables */
    /* Tendremos ua tarea, un observador y un avisador para todos aquellos que esten sucritos a el y otro para lanzar un evento */
  tarea?: Tarea;
  private tareaSubject = new BehaviorSubject<Tarea | null>(null);
  tarea$ = this.tareaSubject.asObservable();
  private scrollSubject = new Subject<void>();
  scrollEvent$ = this.scrollSubject.asObservable();

  /* Dentro del constructor iniciamos el avisador */
  constructor() {
    this.tareaSubject.next(null);
  }

/*''''''''''''''Estos metodos fueron realizados con el fin de no usar el paso de parametros, pero al final se termino usando eso'''''''''''''''''''''''*/

  /* Metodo para obetener la tarea seleccionada por el usuario */
  getTarea(){
    return this.tareaSubject.value;
  }

  /* Metodo para avisar a los suscriptores que existe una tarea */
  setTarea(tarea: Tarea){
    this.tareaSubject.next(tarea);
  }

  /*''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''*/

  /* Metodo para ejecutar el scroll en la pagina */
  triggerScroll() {
    this.scrollSubject.next();
  }
}
