import { Etiqueta } from "./etiqueta";

/* Interfaz de la tarea la cual tendra sus atributos y su arreglo de etiquetas y puede ser null por que no es requerido */
export interface Tarea  {
  id: number;
  name: string;
  time: Date;
  contenido: string;
  tags: Etiqueta[] | null;
}
