import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { VehicleSelectionService, VehicleService } from '../../services/vehicle.service';
import { ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { getBusStops, BusStop} from '../../bus-stops';
import { Loader } from '@googlemaps/js-api-loader';
import { SocketService } from '../../services/socket.service';
import { GoogleMap } from '@angular/google-maps';

function parseCoordinates(lat: any, lng: any): google.maps.LatLngLiteral | null {
  const latNum = parseFloat(lat?.toString() ?? '');
  const lngNum = parseFloat(lng?.toString() ?? '');
  return isNaN(latNum) || isNaN(lngNum) ? null : { lat: latNum, lng: lngNum };
}

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
  busMarker: google.maps.Marker | null = null;


  // ...existing code...
// *paradero* Guarda la hora de llegada por paradero
arrivalTimes: { [label: string]: { timestamp: string; velocidad: number } } = {}; 


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
    private vehicleService: VehicleService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    // Cargar el mapa y las rutas
    this.loadMap();


  // Suscribirse al evento WebSocket 'new-sensor-data'
  this.socketService
  .onEvent<{ latitude: string | number; longitude: string | number; velocidad: number }>('new-sensor-data')
  .subscribe({
    next: (data) => {
      const coords = parseCoordinates(data.latitude, data.longitude);
      if (!coords) {
        console.warn('Coordenadas inválidas recibidas del WebSocket:', data);
        return;
      }
      this.updateVehicleLocation(coords.lat, coords.lng);
      //*paradero* 
      const timestamp = new Date().toLocaleTimeString('es-PE', { hour12: true });
      this.checkArrival(coords.lat, coords.lng, timestamp, data.velocidad);

    },
    error: (err) => console.error('Error al recibir datos del WebSocket:', err),
  });

  }

  loadMap(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyDIrnsD4r1ZFH6rnjcrXtw-vKLK80QYIHY',
      version: 'weekly',
    });

    loader.load().then(() => {
      this.mapLoaded = true;
      this.busStops = getBusStops();

      // Suscribirse a cambios en la selección del vehículo
      this.vehicleSelectionService.selectedVehicle$.subscribe((placa) => {
        console.log('Placa recibida en MapComponent:', placa);
        if (placa) {

          this.vehicleService.getVehicleLocationByPlate(placa).subscribe({
          next: (location) => {
            const coords = parseCoordinates(location.latitude, location.longitude);
            if (!coords) {
              console.warn('Coordenadas inválidas recibidas del servicio:', location);
              return;
            }
            this.updateVehicleLocation(coords.lat, coords.lng);
          },
          error: (err) => console.error('Error al obtener ubicación:', err),
        });

        }
      });

      this.loadCompleteRoute();
    });
  }
@ViewChild('map', { static: false }) map!: GoogleMap;
updateVehicleLocation(latitude: number, longitude: number): void {
  const newPosition = { lat: latitude, lng: longitude };

  if (!this.busMarker) {
    // Si el marcador aún no existe, créalo
    this.busMarker = new google.maps.Marker({
      position: newPosition,
      map: (document.getElementsByTagName('google-map')[0] as any).map,
      //map: this.map.googleMap, // o usa @ViewChild si prefieres
      title: 'Bus en tiempo real',
      icon: {
        url: 'https://maps.google.com/mapfiles/kml/shapes/bus.png',
        scaledSize: new google.maps.Size(30, 30),

      },
    });
  } else {
    // Si ya existe, animamos el movimiento suavemente
    this.animateMarkerTo(this.busMarker, newPosition, 1000); // duración 1 segundo
  }

  // También puedes mover el centro si lo deseas:
  this.center = newPosition;
}

// *paradero* ...existing code...

checkArrival(lat: number, lng: number, timestamp: string, velocidad: number) {
  const tolerance = 0.0001;

  for (const stop of this.busStops) {
    if (
      !this.arrivalTimes[stop.label] &&
      Math.abs(lat - stop.position.lat) < tolerance &&
      Math.abs(lng - stop.position.lng) < tolerance
    ) {
      // Guardar timestamp y velocidad como objeto
      this.arrivalTimes[stop.label] = {
        timestamp,
        velocidad
      };

      // Persistir en localStorage
      localStorage.setItem('arrivalTimes', JSON.stringify(this.arrivalTimes));

      console.log(`Llegada registrada en paradero ${stop.title}`);
      console.log(`Hora: ${timestamp} |  Velocidad: ${velocidad} km/h`);
    }
  }
}
// ...existing code...

animateMarkerTo(marker: google.maps.Marker, newPosition: google.maps.LatLngLiteral, duration: number): void {
  const start = marker.getPosition();
  if (!start) return;

  const startLat = start.lat();
  const startLng = start.lng();
  const deltaLat = newPosition.lat - startLat;
  const deltaLng = newPosition.lng - startLng;

  let startTime: number | null = null;

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);

    const currentLat = startLat + deltaLat * progress;
    const currentLng = startLng + deltaLng * progress;

    marker.setPosition({ lat: currentLat, lng: currentLng });

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
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

