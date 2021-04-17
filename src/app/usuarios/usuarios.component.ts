import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios/usuarios.service'
import { ColaboradorService } from '../services/colaborador/colaborador.service'
import { HistoriaClinicaService } from '../services/historiaClinica/historia-clinica.service'
import { MascotasService } from '../services/mascotas/mascotas.service'
import { DetallesHistoriaClinicaService } from '../services/detallesHistoriaClinica/detalles-historia-clinica.service'
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any;
  usuarioForm = new FormGroup({
    nombre: new FormControl(),
    apellido: new FormControl(),
    documentoIdentifcacion: new FormControl(),
    tipoDocumento: new FormControl(),
    estado: new FormControl(),
    sexo: new FormControl(),

  });



  constructor(

    public fb: FormBuilder,
    public usariosService: UsuariosService,
    public colaboradorService: ColaboradorService,
    public historiaClinicaService: HistoriaClinicaService,
    public mascotasService: MascotasService,

    public detallesHistoriaClinicaService: DetallesHistoriaClinicaService
  ) {


  }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      documentoIdentificacion: ['', Validators.required],
      estado: ['', Validators.required],
      sexo: ['', Validators.required],
    });

    this.usariosService.getAllUsuarios().subscribe(resp => {
      this.usuarios = resp;
    },
      error => { console.error(error) }
    )

  }


  guardar(): void {
    if (this.usuarioForm.valid) {
      console.log(this.usuarioForm.value);
      this.usariosService.saveUsuario(this.usuarioForm.value).subscribe(resp => {
        Swal.fire('usuario guardado ', 'completado', 'success');
        this.usuarioForm.reset();
        this.usuarios = this.usuarios.filter((usuario: { id: any; }) => resp.id != usuario.id);
        this.usuarios.push(resp);


      }, error => {
        console.error(error)
        Swal.fire('ha surgido un error por favor vuleva a mandar el formulario!', 'Usuario no guardado', 'error');
      }
      )

    } else {
      Swal.fire('Debes llenar todos los campos del formulario!', '???????', 'question');
    }
  }

  eliminar(usuario: any) {
    this, this.usariosService.deleteUsuario(usuario.id).subscribe(resp => {
      if (resp) {
        this.usuarios.pop(usuario)
        Swal.fire('usuario Eliminado ', 'completado', 'success');

      }
    })
  }
  editar(usuarios: any) {
    this.usuarioForm.setValue({
      id: usuarios.id,
      nombre: usuarios.nombre,
      apellido: usuarios.apellido,
      tipoDocumento: usuarios.tipoDocumento,
      documentoIdentificacion: usuarios.documentoIdentificacion,
      estado: usuarios.estado,
      sexo: usuarios.sexo,
    })
  }

}





