import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from './cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'https://barberia-backend-glt2.onrender.com/api/citas';

  constructor(private http: HttpClient) {}

  obtenerCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  registrarCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  eliminarCita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editarCita(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, cita);
  }

  marcarComoAtendida(id: number): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}/atender`, null);
  }

  cancelarCita(id: number): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}/cancelar`, null);
  }
}