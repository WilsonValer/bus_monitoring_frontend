import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000/api/vehicles';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getVehiclesByUser(userId: number): Observable<any[]> {
    const token = this.authService.getToken(); // Obtener el token del usuario
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Agregar el token en el header
    });

    return this.http.get<any[]>(`${this.apiUrl}/${userId}`, { headers });
  }
    // 🔹 Nuevo método para obtener la ubicación en tiempo real de un vehículo por su placa
  // 🔹 Obtener la última ubicación del vehículo basado en la placa
  getVehicleLocationByPlate(placa: string): Observable<{
  latitude: number | string;
  longitude: number | string;
  velocidad: number;
  timestamp: string;
  }> {
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<{
    latitude: number | string;
    longitude: number | string;
    velocidad: number;
    timestamp: string;
  }>(
    `${this.apiUrl}/location/${placa}`,
    { headers }
  );
  }
}

@Injectable({
  providedIn: 'root'
})
export class VehicleSelectionService {
  private selectedVehicleSubject = new BehaviorSubject<string | null>(null);
  selectedVehicle$ = this.selectedVehicleSubject.asObservable();

  constructor() {}

  setSelectedVehicle(placa: string) {
    this.selectedVehicleSubject.next(placa);
  }

  getSelectedVehicle(): string | null {
    return this.selectedVehicleSubject.getValue();
  }
}