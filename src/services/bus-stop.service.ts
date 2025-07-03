import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
 


// Interfaz para el paradero según la respuesta de tu API
export interface ApiBusStop {
  id: number;
  nombre: string;
  latitude: string;
  longitude: string;
  radio: number;
}

@Injectable({
  providedIn: 'root'
})
export class BusStopService {
  private apiUrl = 'http://localhost:3000/api/paraderos';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Obtener todos los paraderos
  getAllBusStops(): Observable<ApiBusStop[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiBusStop[]>(this.apiUrl, { headers });
  }

  // (Opcional) Obtener un paradero por ID
  getBusStopById(id: number): Observable<ApiBusStop> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ApiBusStop>(`${this.apiUrl}/${id}`, { headers });
  }
}