import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { VehicleSelectionService, VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 }; // Default: Lima, Perú
  zoom = 12;

  constructor(
    private vehicleSelectionService: VehicleSelectionService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    // Suscribirse a cambios en la selección del vehículo
    this.vehicleSelectionService.selectedVehicle$.subscribe(placa => {
      if (placa) {
        // Hacer una petición al backend para obtener la ubicación real
        this.vehicleService.getVehicleLocationByPlate(placa).subscribe({
          next: (location) => {
            this.center = { lat: location.latitude, lng: location.longitude };
            console.log(`Ubicación actualizada: ${location.latitude}, ${location.longitude}`);
          },
          error: (err) => console.error('Error al obtener ubicación:', err)
        });
      }
    });
  }
}