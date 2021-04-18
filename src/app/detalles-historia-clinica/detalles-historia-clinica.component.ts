import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HistoriaClinicaService } from '../services/historiaClinica/historia-clinica.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { DetallesHistoriaClinicaService } from '../services/detallesHistoriaClinica/detalles-historia-clinica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-historia-clinica',
  templateUrl: './detalles-historia-clinica.component.html',
  styleUrls: ['./detalles-historia-clinica.component.css']
})
export class DetallesHistoriaClinicaComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public detallesClinicaService: DetallesHistoriaClinicaService) { }


  detalles: any;
  detallesForm = new FormGroup({
    temperatura: new FormControl(),
    peso: new FormControl(),
    frecuenciaCardiaca: new FormControl(),
    fecha_Hora: new FormControl(),
    frecuenciaRespiratoria: new FormControl(),
    alimentacion: new FormControl(),
    habitad: new FormControl(),
    observacion: new FormControl(),
    colaborador: new FormControl(),
    historiaClinica: new FormControl()
  });
  ngOnInit(): void {

    this.detallesForm = this.fb.group({
      id: [''],
      temperatura: ['', Validators.required],
      peso: ['', Validators.required],
      frecuenciaCardiaca: ['', Validators.required],
      fecha_Hora: [''],
      frecuenciaRespiratoria: ['', Validators.required],
      alimentacion: ['', Validators.required],
      habitad: ['', Validators.required],
      observacion: ['', Validators.required],
      colaborador: ['', Validators.required],
      historiaClinica: ['', Validators.required],
    });
    this.mostrarDatos();
  }


  mostrarDatos() {
    this.detallesClinicaService.getAllDetallesHistoriaClinica().subscribe(resp => {
      this.detalles = resp;
    },
      error => { console.error(error) }
    )

  }





  guardar(): void {
    if (this.detallesForm.valid) {
      console.log(this.detallesForm.value);
      this.detallesClinicaService.saveDetallesHistoriaClinica(this.detallesForm.value).subscribe(resp => {
        Swal.fire('usuario guardado ', 'completado', 'success');
        this.detallesForm.reset();
        this.detalles = this.detalles.filter((usuario: { id: any; }) => resp.id != usuario.id);
        this.detalles.push(resp);


      }, error => {
        console.error(error)
        Swal.fire('ha surgido un error por favor vuleva a mandar el formulario!', 'Usuario no guardado', 'error');
      }
      )

    } else {
      Swal.fire('Debes llenar todos los campos del formulario!', '???????', 'question');
    }
  }

  eliminar(detalles: any) {
    this, this.detallesClinicaService.deleteDetallesHistoriaClinica(detalles.id).subscribe(resp => {
      if (resp) {
        this.mostrarDatos();
        Swal.fire('usuario Eliminado ', 'completado', 'success');

      }
    })
  }

  editar(detalles: any) {
    this.detallesForm.setValue({
      id: detalles.id,
      temperatura: detalles.temperatura,
      frecuenciaCardiaca: detalles.frecuenciaCardiaca,
      fecha_hora: detalles.fecha_hora,
      frecuenciaRespiratoria: detalles.frecuenciaRespiratoria,
      alimentacion: detalles.alimentacion,
      habitad: detalles.habitad,
      observacion: detalles.observacion,
      colaborador: detalles.colaborador,
      historiaClinica: detalles.historiaClinica,
    })
  }

}
