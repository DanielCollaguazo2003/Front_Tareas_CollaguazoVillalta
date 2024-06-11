import { Injectable } from '@angular/core';
import { Tarea } from '../domain/tarea';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private tareaSubject = new BehaviorSubject<Tarea | null>(null);
  tarea$ = this.tareaSubject.asObservable();
  private scrollSubject = new Subject<void>();
  scrollEvent$ = this.scrollSubject.asObservable();
  tareasLocales: Tarea[] = [];

  constructor(private http: HttpClient) {
    this.tareaSubject.next(null);
  }

  //MEtodo para devolver Tareas:
  getTareas(){
    let url = environment.WS_PATH + "/Tareas"
    return this.http.get<any>(url)
  }

  //Metodo para guardar Tareas
  saveTarea(tarea: Tarea) {
    if(this.tareasLocales.length != 0){
      for (let index = 0; index < this.tareasLocales.length; index++) {
        const element = this.tareasLocales[index];

      }
    }
    tarea.tags = [];
    let url = environment.WS_PATH + "/Tareas"
    return this.http.post<any>(url, tarea);
  }

  //Metodo para eliminar
  deleteTarea(tarea: Tarea) {
    let url = environment.WS_PATH + `/Tareas?id=${tarea}`
    return this.http.delete<any>(url);
  }

  //MEtodo para devolver un Tarea:
  getTareaPorId(codigo: number) {
    let url = environment.WS_PATH + `/Tareas?codigo=${codigo}`
    return this.http.get<any>(url)
  }
  /* Metodo para ejecutar el scroll en la pagina */
  triggerScroll() {
    this.scrollSubject.next();
  }
}
