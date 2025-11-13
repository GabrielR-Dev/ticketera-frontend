import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { IUsuario } from '../../../interfaces/IUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';
  usuariosDatos: IUsuario[] = [];
  error: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  async cargarUsuarios() {
    this.apiService.getUsers().subscribe({
      next: (datos) => {
        this.usuariosDatos = datos.map((d: any) => ({
          id: d.ID,
          email: d.EMAIL,
          contraseña: d.CONTRASENA,
          apellido: d.APELLIDO,
          rol: d.ROL,
          telefono: d.TELEFONO,
          dni: d.DNI,
          activo: d.ACTIVO,
          fechaRegistro: d.FECHAREGISTRO,
        }));
        // console.log('Usuarios cargados:', this.usuariosDatos);
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      },
    });
  }

  onSubmit() {
    const usuarioEncontrado = this.usuariosDatos.find(
      (element) =>
        element.email === this.usuario && element.contraseña === this.password && element.activo
    );

    if (usuarioEncontrado) {
      this.error = '';
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/menu/dashboard']);
    } else if (!this.usuario || !this.password) {
      this.error = 'Por favor, ingrese email y contraseña.';
    } else {
      this.error = 'Usuario o email incorrectos.';
    }

  }
}
