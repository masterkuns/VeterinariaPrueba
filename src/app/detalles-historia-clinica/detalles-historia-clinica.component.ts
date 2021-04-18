import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HistoriaClinicaService } from '../services/historiaClinica/historia-clinica.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { DetallesHistoriaClinicaService } from '../services/detallesHistoriaClinica/detalles-historia-clinica.service';
import { ColaboradorService } from '../services/colaborador/colaborador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-historia-clinica',
  templateUrl: './detalles-historia-clinica.component.html',
  styleUrls: ['./detalles-historia-clinica.component.css']
})
export class DetallesHistoriaClinicaComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public detallesClinicaService: DetallesHistoriaClinicaService,
    public colaboradorService: ColaboradorService,
    public historiasClinicaService: HistoriaClinicaService) { }
  historias: any;
  colaboradores: any;
  detalles: any;
  detallesForm = new FormGroup({
    temperatura: new FormControl(),
    peso: new FormControl(),
    frecuenciaCardiaca: new FormControl(),
    fechaHora: new FormControl(),
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
      fechaHora: [''],
      frecuenciaRespiratoria: ['', Validators.required],
      alimentacion: ['', Validators.required],
      habitad: ['', Validators.required],
      observacion: ['', Validators.required],
      colaborador: ['', Validators.required],
      historiaClinica: ['', Validators.required],
    });

    this.mostrarDatos();

    this.colaboradorService.getAllColaborador().subscribe(resp => {
      this.colaboradores = resp;
    },
      error => { console.error(error) }
    )


    this.historiasClinicaService.getAllHistorias().subscribe(resp => {
      this.historias = resp;
    },
      error => { console.error(error) }
    )

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
        this.detalles = this.detalles.filter((detalles: { id: any; }) => resp.id != this.detalles.id);
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


    Swal.fire({
      title: 'estas seguro?',
      text: 'borrar detalles de la historia  ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si,borralo!',
      cancelButtonText: 'No, cancela'
    }).then((result) => {
      if (result.value) {

        this, this.detallesClinicaService.deleteDetallesHistoriaClinica(detalles.id).subscribe(resp => {
          if (resp) {
            this.mostrarDatos();
            Swal.fire('Historia Eliminada ', 'completado', 'success');

          }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'el dato no fue eliminado)',
          'error'
        )
      }
    })





  }

  editar(detalles: any) {
    this.detallesForm.setValue({
      id: detalles.id,
      temperatura: detalles.temperatura,
      peso: detalles.peso,
      frecuenciaCardiaca: detalles.frecuenciaCardiaca,
      fechaHora: detalles.fechaHora,
      frecuenciaRespiratoria: detalles.frecuenciaRespiratoria,
      alimentacion: detalles.alimentacion,
      habitad: detalles.habitad,
      observacion: detalles.observacion,
      colaborador: detalles.colaborador,
      historiaClinica: detalles.historiaClinica,
    })
  }

}
