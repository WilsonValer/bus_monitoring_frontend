import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { VehicleSelectionService, VehicleService } from '../../services/vehicle.service';
import { ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { getBusStops, BusStop} from '../../bus-stops';
import { Loader } from '@googlemaps/js-api-loader';

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
  busStops: BusStop[] = [];
  busRoute: google.maps.LatLngLiteral[] = [];
  mapLoaded = false;

  //@ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild('infoWindow') infoWindow!: MapInfoWindow;

  selectedStop: any = null;

  openInfoWindow(stop: any, marker: MapMarker): void {
    console.log('Abrir InfoWindow para:', stop.title);
    this.selectedStop = stop;
    this.infoWindow.open(marker);
  }
  closeInfoWindow(): void {
    this.infoWindow.close();
  }


routeOptions: google.maps.PolylineOptions = {
  strokeColor: '#4285F4', // azul Google Maps
  strokeOpacity: 0.8,
  strokeWeight: 4,
};


  constructor(
    private vehicleSelectionService: VehicleSelectionService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyDIrnsD4r1ZFH6rnjcrXtw-vKLK80QYIHY', // 👈 Aquí pones tu API KEY
      version: 'weekly'
    });

    loader.load().then(() => {
      this.mapLoaded = true;
      this.busStops = getBusStops();

      // Suscribirse a cambios en la selección del vehículo
      this.vehicleSelectionService.selectedVehicle$.subscribe(placa => {
        console.log('Placa recibida en MapComponent:', placa);
        if (placa) {
          // Hacer una petición al backend para obtener la ubicación real
          this.vehicleService.getVehicleLocationByPlate(placa).subscribe({
            next: (location) => {
              const latNum = parseFloat(location.latitude.toString());
              const lngNum = parseFloat(location.longitude.toString());
              this.center = { lat: latNum, lng: lngNum };
              console.log(`Ubicación actualizada: ${location.latitude}, ${location.longitude}`);
            },
            error: (err) => console.error('Error al obtener ubicación:', err)
          });
        }
      });
      this.loadCompleteRoute();

    });

    

  }

  // ⚡ Método nuevo: carga la ruta real con Google Directions API
  loadCompleteRoute(): void {
    const directionsService = new google.maps.DirectionsService();

    const waypoints: google.maps.DirectionsWaypoint[] = [
      // Aquí colocas los puntos intermedios que desees en tu ruta
      { location: { lat: -11.95562410698981, lng: -76.99216732365588}, stopover: true },
      { location: { lat: -11.962959139340485, lng: -77.00090347183564}, stopover: true },
      { location: { lat: -11.975104895328354, lng: -77.00889918442113}, stopover: true },
      { location: { lat: -11.995925025514751, lng: -77.00529711873268 }, stopover: true },//10
      { location: { lat: -12.016358486872864, lng: -76.99731010351225 }, stopover: true },//13
      { location: { lat: -12.017873587180432, lng: -77.00194441138302 }, stopover: true },//14
      { location: { lat: -12.039661922468802, lng: -76.99758123390536 }, stopover: true },//19
      { location: { lat: -12.058576081469035, lng: -77.00726228372595 }, stopover: true },//23
      { location: { lat: -12.062811419271007, lng: -77.00281502814111 }, stopover: true },//24
      { location: { lat: -12.067870544759336, lng: -77.00614938259328 }, stopover: true },//25
      { location: { lat: -12.073065137606337, lng: -77.01607459058286 }, stopover: true },
      // Puedes añadir más waypoints aquí
    ];

    directionsService.route(
      {
        origin: { lat: -11.959125949367095, lng: -76.9868337155503 },  // primer paradero
        destination: { lat: -12.077543856915058, lng: -77.03411813524471 },  // último paradero
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING, // Usa DRIVING o TRANSIT según necesidad
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK && response) {
          this.busRoute = [];

          response.routes[0].overview_path.forEach((point) => {
            this.busRoute.push({ lat: point.lat(), lng: point.lng() });
          });

          // Opcionalmente actualizas el centro
          this.center = this.busRoute[0];
        } else {
          console.error('No se pudo cargar la ruta:', status);
        }
      }
    );
  }
}

