import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MascotasService } from '../services/mascotas/mascotas.service';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css']
})
export class MascotasComponent implements OnInit {



  usuarios: any;

  mascotas: any;
  mascotaForm = new FormGroup({
    nombre: new FormControl(),
    raza: new FormControl(),
    usuario: new FormControl(),
    sexo: new FormControl()
  });

  constructor(public fb: FormBuilder,
    public mascotasService: MascotasService,
    public usariosService: UsuariosService,) { }

  ngOnInit(): void {
    this.mascotaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      usuario: ['', Validators.required],
      sexo: ['', Validators.required],
    });
    this.usariosService.getAllUsuarios().subscribe(resp => {
      this.usuarios = resp;
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
    if (this.mascotaForm.valid) {
      console.log(this.mascotaForm.value);
      this.mascotasService.saveMascota(this.mascotaForm.value).subscribe(resp => {
        Swal.fire('usuario guardado ', 'completado', 'success');
        this.mascotaForm.reset();
        this.mascotas = this.mascotas.filter((mascotas: { id: any; }) => resp.id != mascotas.id);
        this.mascotas.push(resp);


      }, error => {
        console.error(error)
        Swal.fire('ha surgido un error por favor vuleva a mandar el formulario!', 'Usuario no guardado', 'error');
      }
      )

    } else {
      Swal.fire('Debes llenar todos los campos del formulario!', '???????', 'question');
    }
  }



}



