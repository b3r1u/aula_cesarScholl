import { Component, Input } from '@angular/core';
import { Registro } from '../../model/registro.model';

@Component({
  selector: 'app-cadastro-cards',
  templateUrl: './cadastro-cards.component.html',
  styleUrl: './cadastro-cards.component.scss',
})
export class CadastroCardsComponent {
  @Input() registro!: Registro;
}
