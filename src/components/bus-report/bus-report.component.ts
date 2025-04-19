import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import { VehicleSelectionService, VehicleService } from '../../services/vehicle.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bus-report',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bus-report.component.html',

})

export class BusReportComponent implements OnInit {
  placaSeleccionada: string | null = null;
  private placaSub!: Subscription;

  constructor(
    private vehicleSelectionService: VehicleSelectionService,
    private vehicleService: VehicleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.placaSub = this.vehicleSelectionService.selectedVehicle$.subscribe(placa => {
      this.placaSeleccionada = placa;
    });
  }

  ngOnDestroy(): void {
    this.placaSub.unsubscribe();
  }

  generatePDF(): void {
    if (!this.placaSeleccionada) {
      alert('No hay vehículo seleccionado');
      return;
    }

    this.vehicleService.getVehicleLocationByPlate(this.placaSeleccionada).subscribe({
      next: (data) => {
        const doc = new jsPDF();

        const fecha = new Date(data.timestamp);
        const horaLocal = fecha.toLocaleString('es-PE', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'America/Lima'
        });

        const usuario = this.authService.getUser()?.username || 'Desconocido';

        const busInfo = {
          usuario: usuario,
          placa: this.placaSeleccionada,
          conductor: 'Wilson Valer',
          velocidad: `${data.velocidad} km/h`,
          ubicación: `Lat: ${data.latitude}, Lng: ${data.longitude}`,
          hora: horaLocal
        };

        doc.setFontSize(18);
        doc.text('Reporte del Bus', 10, 15);

        doc.setFontSize(12);
        doc.text('este es un reporte generado en PDF con informacion de los buses', 10, 25);

        doc.setFontSize(12);
        let startY = 40;
        Object.entries(busInfo).forEach(([label, value]) => {
          doc.text(`${label.charAt(0).toUpperCase() + label.slice(1)}: ${value}`, 10, startY);
          startY += 15;
        });

                // Firma al final
        doc.setFontSize(12);
        doc.text('_____________________________', 10, startY + 20);
        doc.text('Gerente de Transportes', 10, startY + 30);
        doc.text('Municipalidad de Lima', 10, startY + 37);

        doc.save(`reporte-${this.placaSeleccionada}.pdf`);
      },
      error: (err) => {
        console.error('Error al obtener datos del vehículo:', err);
        alert('Ocurrió un error al generar el reporte');
      }
    });
  }
}