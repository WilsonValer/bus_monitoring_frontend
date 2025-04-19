import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // Conecta al servidor WebSocket (reemplaza con la URL de tu backend)
    this.socket = io('http://localhost:3000'); // Cambia el puerto si es necesario
  }

  // Escuchar eventos desde el servidor
  onEvent<T>(event: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      this.socket.on(event, (data: T) => {
        subscriber.next(data);
      });

      // Limpia el evento cuando se destruye el observable
      return () => this.socket.off(event);
    });
  }

  // Emitir eventos al servidor
  emitEvent<T>(event: string, data: T): void {
    this.socket.emit(event, data);
  }
}