import { Component } from '@angular/core';
import { Registro } from './model/registro.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  registros: Registro[] = [];

  onNewRegistro(data: Registro) {
    this.registros.push(data);
  }
}
