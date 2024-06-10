import { Etiqueta } from "./etiqueta";

/* Interfaz de la tarea la cual tendra sus atributos y su arreglo de etiquetas y puede ser null por que no es requerido */
export interface Tarea  {
  uid: string;
  nombre: string;
  fecha: Date;
  contenido: string;
  etiquetas: Etiqueta[] | null;
}
