import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../cita.service';
import { Cita } from '../cita.model';

@Component({
  selector: 'app-citas',
  imports: [CommonModule, FormsModule],
  templateUrl: './citas.html',
  styleUrl: './citas.css'
})
export class Citas implements OnInit {
  citas: Cita[] = [];

  nuevaCita: Cita = {
    cliente: '',
    fecha: '',
    hora: '',
    barbero: '',
    estado: 'pendiente'
  };

  constructor(
    private citaService: CitaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citaService.obtenerCitas().subscribe((datos) => {
      this.citas = datos;
      this.cdr.detectChanges();
    });
  }

  mensajeError: string = '';

  registrar(): void {
    this.mensajeError = '';
    this.citaService.registrarCita(this.nuevaCita).subscribe({
      next: () => {
        this.nuevaCita = { cliente: '', fecha: '', hora: '', barbero: '', estado: 'pendiente' };
        this.cargarCitas();
      },
      error: (err) => {
        this.mensajeError = err.error || 'Ocurrió un error al registrar la cita.';
      }
    });
  }

  eliminar(id: number): void {
    const confirmado = confirm('¿Estás seguro de que quieres eliminar esta cita?');
    if (!confirmado) {
      return;
    }

    this.citaService.eliminarCita(id).subscribe(() => {
      this.cargarCitas();
    });
  }

  atender(id: number): void {
    this.citaService.marcarComoAtendida(id).subscribe(() => {
      this.cargarCitas();
    });
  }

  cancelar(id: number): void {
    this.citaService.cancelarCita(id).subscribe(() => {
      this.cargarCitas();
    });
  }

  citaEnEdicion: Cita | null = null;

  empezarEdicion(cita: Cita): void {
    this.citaEnEdicion = { ...cita };
  }

  cancelarEdicion(): void {
    this.citaEnEdicion = null;
  }

  guardarEdicion(): void {
    if (!this.citaEnEdicion || !this.citaEnEdicion.id) return;

    this.citaService.editarCita(this.citaEnEdicion.id, this.citaEnEdicion).subscribe(() => {
      this.citaEnEdicion = null;
      this.cargarCitas();
    });
  }

  filtroEstado: string = 'todos';
  filtroBarbero: string = 'todos';

 get citasFiltradas(): Cita[] {
  return this.citas.filter(cita => {
    const coincideEstado = this.filtroEstado === 'todos' || cita.estado === this.filtroEstado;
    const coincideBarbero = this.filtroBarbero === 'todos' || cita.barbero === this.filtroBarbero;
    return coincideEstado && coincideBarbero;
  });
}
  get barberosUnicos(): string[] {
    const nombres = this.citas.map(cita => cita.barbero);
    return [...new Set(nombres)];
  }
}