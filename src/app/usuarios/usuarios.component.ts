import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios/usuarios.service'
import { ColaboradorService } from '../services/colaborador/colaborador.service'
import { HistoriaClinicaService } from '../services/historiaClinica/historia-clinica.service'
import { MascotasService } from '../services/mascotas/mascotas.service'
import { DetallesHistoriaClinicaService } from '../services/detallesHistoriaClinica/detalles-historia-clinica.service'
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

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
    public usuarioservice: UsuariosService,
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
  }


  guardar(): void {
    this.usuarioservice.saveUsuario(this.usuarioForm.value).subscribe(resp => {

    }, error => {
      console.error(error)

    }
    )

  }

}



