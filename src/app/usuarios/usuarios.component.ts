import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoriaClinicaService } from '../services/historiaClinica/historia-clinica.service';
import { MascotasService } from '../services/mascotas/mascotas.service';
import { DetallesHistoriaClinicaService } from '../services/detallesHistoriaClinica/detalles-historia-clinica.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { $$ } from 'protractor';
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

    public historiaClinicaService: HistoriaClinicaService,
    public mascotasService: MascotasService,

    public detallesHistoriaClinicaService: DetallesHistoriaClinicaService,

    public dialog: MatDialog
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

    this.mostrarTodos();

  }

  get f() {

    return this.usuarioForm.controls

  }

  openDialog() {
    const dialogRef = this.dialog.open(UsuariosComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }




  mostrarTodos() {

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

        this.mostrarTodos()


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
    Swal.fire({
      title: 'estas seguro?',
      text: 'al borrar este dato todos los archivos que dependan de este seran eliminados en cascda !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'si,borralo!',
      cancelButtonText: 'No, cancela'
    }).then((result) => {
      if (result.value) {

        this, this.usariosService.deleteUsuario(usuario.id).subscribe(resp => {
          if (resp) {
            this.mostrarTodos();
            Swal.fire('usuario Eliminado ', 'completado', 'success');

          }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'el archivo no fue eliminado)',
          'error'
        )
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





