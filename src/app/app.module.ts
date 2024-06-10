import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { IndiceComponent } from './indice/indice.component';
import { ModelEtiquetasComponent } from './components/model-etiquetas/model-etiquetas.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    ListaTareasComponent,
    PrincipalComponent,
    IndiceComponent,
    ModelEtiquetasComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
