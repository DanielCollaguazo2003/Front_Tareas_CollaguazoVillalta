import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndiceComponent } from './indice/indice.component';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';
import { FormularioComponent } from './components/formulario/formulario.component';

const routes: Routes = [
  { path: "home", component: IndiceComponent },
  { path: "lista", component: ListaTareasComponent },
  { path: 'formulario/:id', component: FormularioComponent },
  { path: "**", redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
