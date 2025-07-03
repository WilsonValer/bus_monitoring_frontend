import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jsPDF } from 'jspdf';
import { VehicleSelectionService, VehicleService } from '../../services/vehicle.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { getBusStops } from '../../bus-stops';

@Component({
  selector: 'app-bus-report',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bus-report.component.html',
  // Si tienes un archivo de estilos, podrías agregarlo aquí:
  // styleUrls: ['./bus-report.component.css']
})
export class BusReportComponent implements OnInit, OnDestroy {
  placaSeleccionada: string | null = null;
  private placaSub!: Subscription;

  constructor(
    private vehicleSelectionService: VehicleSelectionService,
    private vehicleService: VehicleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de la placa seleccionada
    this.placaSub = this.vehicleSelectionService.selectedVehicle$.subscribe(placa => {
      this.placaSeleccionada = placa;
    });
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    if (this.placaSub) {
      this.placaSub.unsubscribe();
    }
  }

  generatePDF(): void {
    if (!this.placaSeleccionada) {
      alert('No hay vehículo seleccionado para generar el reporte.');
      return;
    }

    // Recuperar los tiempos de llegada de localStorage
    const arrivalTimes = JSON.parse(localStorage.getItem('arrivalTimes') || '{}');


    // Obtener la ubicación del vehículo para generar el reporte
    this.vehicleService.getVehicleLocationByPlate(this.placaSeleccionada).subscribe({
      next: (data) => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;
        const rowHeight = 10;
        const colX = 10;
        const colWidths = [80, 40]; // Anchos para las columnas de Paradero y Hora

        // --- Corrección para obtener la hora local de Lima en formato 24 horas ---
        const timestampDate = new Date(data.timestamp);
        console.log('timestampDate wilson :', timestampDate); // Crea un objeto Date desde el timestamp
        const formatter = new Intl.DateTimeFormat('es-PE', {
          timeZone: 'America/Lima',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false // <--- ¡Esta línea asegura el formato de 24 horas!
        });
        const horaLocal = formatter.format(timestampDate);
        // ---------------------------------------------------------------------

        const usuario = this.authService.getUser()?.username || 'Desconocido';
        const busInfo = {
          usuario,
          placa: this.placaSeleccionada,
          conductor: 'Wilson Valer', // Esto parece ser un valor fijo, considera si debe ser dinámico
          velocidad: `${data.velocidad} km/h`,
          ubicación: `Lat: ${data.latitude}, Lng: ${data.longitude}`,
          hora_Registro: horaLocal,
        };

        // Título del reporte
        doc.setFontSize(18);
        doc.text('Reporte del Bus', margin, 20);
        doc.setFontSize(12);
        doc.text('Este es un reporte generado en PDF con información relevante del bus.', margin, 30);

        // Imprimir información general del bus
        let cursorY = 40;
        Object.entries(busInfo).forEach(([label, value]) => {
          // Formatear el label para que la primera letra sea mayúscula
          const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);
          doc.text(`${formattedLabel}: ${value}`, margin, cursorY);
          cursorY += 6; // Espacio entre líneas
        });

        // Encabezado de la tabla de paraderos
        cursorY += 10; // Espacio antes del título de la tabla
        doc.setFontSize(14);
        doc.text('Paraderos y horas de llegada:', margin, cursorY);
        cursorY += 8; // Espacio antes de la tabla

        // Dibujar encabezado de columnas de la tabla
        doc.setFontSize(12);
        doc.setDrawColor(0); // Color de borde negro
        doc.rect(colX, cursorY, colWidths[0], rowHeight); // Rectángulo para 'Paradero'
        doc.rect(colX + colWidths[0], cursorY, colWidths[1], rowHeight); // Rectángulo para 'Hora'
        doc.text('Paradero', colX + 2, cursorY + rowHeight - 2); // Texto 'Paradero'
        doc.text('Hora en Paradero', colX + colWidths[0] + 2, cursorY + rowHeight - 2); // Texto 'Hora'
        cursorY += rowHeight; // Mover cursor a la siguiente fila

        const busStops = getBusStops(); // Obtener la lista de paraderos

        // Iterar sobre cada paradero para añadirlo a la tabla
        busStops.forEach(stop => {
          // Verificar si la siguiente fila excederá el límite de la página
          if (cursorY + rowHeight > pageHeight - margin) {
            doc.addPage(); // Añadir nueva página
            cursorY = margin; // Reiniciar cursor en el margen superior de la nueva página

            // Redibujar encabezado de tabla en la nueva página
            doc.setFontSize(14);
            doc.text('Paraderos y horas de llegada (cont.):', margin, cursorY);
            cursorY += 8;

            doc.setFontSize(12);
            doc.rect(colX, cursorY, colWidths[0], rowHeight);
            doc.rect(colX + colWidths[0], cursorY, colWidths[1], rowHeight);
            doc.text('Paradero', colX + 2, cursorY + rowHeight - 2);
            doc.text('Hora en Paradero', colX + colWidths[0] + 2, cursorY + rowHeight - 2);
            cursorY += rowHeight;
          }

          // Obtener la hora de llegada del localStorage, si existe
          const hora = arrivalTimes[stop.label]?.slice(0, 8) || 'No registrado'; // Usa slice(0,8) para HH:MM:SS

          // Dibujar la fila actual de la tabla
          doc.rect(colX, cursorY, colWidths[0], rowHeight);
          doc.rect(colX + colWidths[0], cursorY, colWidths[1], rowHeight);
          doc.text(stop.title, colX + 2, cursorY + rowHeight - 2, {
            maxWidth: colWidths[0] - 4 // Asegura que el texto no se desborde
          });
          doc.text(hora, colX + colWidths[0] + 2, cursorY + rowHeight - 2, {
            maxWidth: colWidths[1] - 4
          });
          cursorY += rowHeight; // Mover cursor a la siguiente fila
        });

        // Sección de firma al final del reporte
        if (cursorY + 30 > pageHeight - margin) {
          doc.addPage();
          cursorY = margin;
        }
        cursorY += 10; // Espacio antes de la línea de firma
        doc.text('_____________________________', margin, cursorY);
        doc.text('Gerente de Transportes', margin, cursorY + 8);
        doc.text('Municipalidad de Lima', margin, cursorY + 15);

        // Guardar el documento PDF
        doc.save(`reporte-${this.placaSeleccionada}.pdf`);
      },
      error: (err) => {
        console.error('Error al obtener datos del vehículo:', err);
        alert('Ocurrió un error al generar el reporte. Por favor, inténtalo de nuevo.');
      }
    });
  }
}