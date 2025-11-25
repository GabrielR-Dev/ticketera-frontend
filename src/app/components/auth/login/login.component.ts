import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { IUsuario } from '../../../interfaces/IUsuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // email: string = '';
  // password: string = '';
  usuariosDatos: IUsuario[] = [];
  error: string = '';

  formularioLogin: FormGroup;

  constructor(private apiService: ApiService, private _fb: FormBuilder, private router: Router) {
    this.formularioLogin = _fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.apiService.getUsers().subscribe({
      next: (datos: IUsuario[]) => {
        this.usuariosDatos = datos;
        // console.log('Usuarios cargados:', this.usuariosDatos);
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      },
    });
  }

  // onSubmit() {
  //   const usuarioEncontrado = this.usuariosDatos.find(
  //     (element) =>
  //       element.EMAIL === this.usuario && element.CONTRASENA === this.password && element.ACTIVO
  //   );

  //   if (usuarioEncontrado) {
  //     this.error = '';
  //     console.log('Inicio de sesión exitoso');
  //     this.router.navigate(['/menu/dashboard']);
  //   } else if (!this.usuario || !this.password) {
  //     this.error = 'Por favor, ingrese email y contraseña.';
  //   } else {
  //     this.error = 'Usuario o email incorrectos.';
  //   }

  // }

  onSubmit() {

    const valores = this.formularioLogin.value;

    const usuarioEncontrado = this.usuariosDatos.find(
      (element) =>
        element.EMAIL === valores.email && element.CONTRASENA === valores.password && element.ACTIVO
    );

    if (usuarioEncontrado) {
      console.log("encontro el usuario")
      this.router.navigate(['/menu/dashboard'])
    } else {
      console.log("no se encontro el usuario")
      this.error = 'Email o contraseña incorrectos.';
    }
    
  }

  mostrarErrores(control: string, validator: string) {
    const campo = this.formularioLogin.get(control)
    return campo?.hasError(validator) && campo?.touched;
  }
}
