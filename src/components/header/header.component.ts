import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { VehicleService, VehicleSelectionService } from '../../services/vehicle.service';
import { MapComponent } from '../map/map.component';
//import { HttpClientModule } from '@angular/common/http';
// imports: [CommonModule, HttpClientModule, NgIf, NgFor],

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any = null;
  vehicles: any[] = [];
  selectedVehicle: string | null = null;

  constructor(
    private authService: AuthService,
    private vehicleService: VehicleService,
    private vehicleSelectionService: VehicleSelectionService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    if (this.user && this.user.id) {
      console.log('header en localStorage (this.user.id):', this.user.id);
      this.vehicleService.getVehiclesByUser(this.user.id).subscribe({
        next: (res) => {
          this.vehicles = res;
          
          // Si hay vehículos, seleccionar automáticamente el primero
          console.log('res en localStorage (res):', res);
          if (res.length > 0) {
            this.selectedVehicle = res[0].placa;
            if (this.selectedVehicle !== null) {
              this.vehicleSelectionService.setSelectedVehicle(this.selectedVehicle);
            }
          }
        },
        error: (err) => console.error('Error al obtener vehículos:', err)
      });
    }

    // Suscribirse a los cambios de la placa seleccionada
    this.vehicleSelectionService.selectedVehicle$.subscribe(placa => {
      this.selectedVehicle = placa;
    });
  }

  onSelectVehicle(placa: string) {
    console.log('Seleccionaste la placa:', placa);
    this.vehicleSelectionService.setSelectedVehicle(placa);
  }

  onLogout() {
    this.authService.logout();
    window.location.href = '/login';
  }
}