import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HistoriaClinicaService } from '../services/historiaClinica/historia-clinica.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ColaboradorService } from '../services/colaborador/colaborador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

  colaborador: any;
  colaboradorForm = new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    cargo: new FormControl(),
    especialidad: new FormControl(),
    tipoDocumento: new FormControl(),
    documentoIdentificacion: new FormControl()
  });
  constructor(public fb: FormBuilder,
    public ColaboradorService: ColaboradorService,
  ) { }

  ngOnInit(): void {

    this.colaboradorForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cargo: ['', Validators.required],
      especialidad: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      documentoIdentificacion: ['', Validators.required],
    });
    this.mostrarDatos();
  }

  mostrarDatos() {
    this.ColaboradorService.getAllColaborador().subscribe(resp => {
      this.colaborador = resp;
    },
      error => { console.error(error) }
    )

  }





  guardar(): void {
    if (this.colaboradorForm.valid) {
      console.log(this.colaboradorForm.value);
      this.ColaboradorService.saveColaborador(this.colaboradorForm.value).subscribe(resp => {
        Swal.fire('usuario guardado ', 'completado', 'success');
        this.colaboradorForm.reset();
        this.colaborador = this.colaborador.filter((colaborador: { id: any; }) => resp.id != colaborador.id);
        this.colaborador.push(resp);


      }, error => {
        console.error(error)
        Swal.fire('ha surgido un error por favor vuleva a mandar el formulario!', 'Usuario no guardado', 'error');
      }
      )

    } else {
      Swal.fire('Debes llenar todos los campos del formulario!', '???????', 'question');
    }
  }

  eliminar(colaborador: any) {
    this, this.ColaboradorService.deleteColaborador(colaborador.id).subscribe(resp => {
      if (resp) {
        this.mostrarDatos();
        Swal.fire('usuario Eliminado ', 'completado', 'success');

      }
    })
  }

  editar(colaborador: any) {
    this.colaboradorForm.setValue({
      id: colaborador.id,
      nombre: colaborador.nombre,
      apellido: colaborador.apellido,
      cargo: colaborador.cargo,
      especialidad: colaborador.especialidad,
      tipoDocumento: colaborador.tipoDocumento,
      documentoIdentificacion: colaborador.documentoIdentificacion,
    })
  }

}
