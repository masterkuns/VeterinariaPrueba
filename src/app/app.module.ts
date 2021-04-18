import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MascotasComponent } from './mascotas/mascotas.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { DetallesHistoriaClinicaComponent } from './detalles-historia-clinica/detalles-historia-clinica.component';

import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';                  //api

import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    MascotasComponent,
    HistoriaClinicaComponent,
    ColaboradorComponent,
    DetallesHistoriaClinicaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    TableModule,
    AccordionModule,
    MatDialogModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
