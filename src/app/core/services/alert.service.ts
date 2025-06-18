import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private readonly messageService: MessageService) { } // Inyecta el MessageService de PrimeNG

  // Método para mostrar un toast de éxito
  showSuccess(summary: string, detail: string = '', life: number = 3000): void {
    this.messageService.add({ severity: 'success', summary: summary, detail: detail, life: life });
  }

  // Método para mostrar un toast de información
  showInfo(summary: string, detail: string = '', life: number = 3000): void {
    this.messageService.add({ severity: 'info', summary: summary, detail: detail, life: life });
  }

  // Método para mostrar un toast de advertencia
  showWarning(summary: string, detail: string = '', life: number = 5000): void { // Le di un poco más de tiempo
    this.messageService.add({ severity: 'warn', summary: summary, detail: detail, life: life });
  }

  // Método para mostrar un toast de error
  showError(summary: string, detail: string = '', life: number = 7000): void { // Le di más tiempo para errores críticos
    this.messageService.add({ severity: 'error', summary: summary, detail: detail, life: life });
  }

  // Opcional: limpiar todos los mensajes
  clear(): void {
    this.messageService.clear();
  }
}
