import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HistoriaClinicaService } from '../services/historiaClinica/historia-clinica.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { MascotasService } from '../services/mascotas/mascotas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  currentTimeInSeconds = Math.floor(Date.now() / 1000);
  historias: any;

  mascotas: any;
  historiaClinicaForm = new FormGroup({

    fechaCreacion: new FormControl(),


  });
  constructor(public fb: FormBuilder,
    public historiasClinicaService: HistoriaClinicaService, public mascotasService: MascotasService,) { }

  ngOnInit(): void {


    this.historiaClinicaForm = this.fb.group({
      id: [''],
      mascota: ['', Validators.required],
      fechaCreacion: [''],
    });
    this.historiasClinicaService.getAllHistorias().subscribe(resp => {
      this.historias = resp;
    },
      error => { console.error(error) }
    )

    this.mascotasService.getAllMascota().subscribe(resp => {
      this.mascotas = resp;
    },
      error => { console.error(error) }
    )


  }

  guardar(): void {

    if (this.historiaClinicaForm.valid) {
      console.log(this.historiaClinicaForm.value);
      this.historiasClinicaService.saveHistorias(this.historiaClinicaForm.value).subscribe(resp => {
        Swal.fire('usuario guardado ', 'completado', 'success');
        console.error(this.currentTimeInSeconds);
        this.historiaClinicaForm.reset();
        this.historias = this.historias.filter((mascotas: { id: any; }) => resp.id != mascotas.id);
        this.historias.push(resp);


      }, error => {
        console.error(error)
        Swal.fire('ha surgido un error por favor vuleva a mandar el formulario!', 'Usuario no guardado', 'error');
      }
      )

    } else {
      Swal.fire('Debes llenar todos los campos del formulario!', '???????', 'question');
    }
  }
  eliminar(historias: any) {
    this, this.historiasClinicaService.deleteHistorias(historias.id).subscribe(resp => {
      if (resp) {
        this.historias.pop(historias)
        Swal.fire('mascota eliminada Eliminado ', 'completado', 'success');

      }
    })
  }
  editar(historias: any) {
    this.historiaClinicaForm.setValue({
      id: historias.id,
      mascota: historias.mascota,



    })
  }



}
