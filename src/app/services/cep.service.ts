import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CepResponse } from '../model/cep.model';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private readonly API_URL = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {}

  buscarCep(cep: string): Observable<CepResponse> {
    return this.http.get<CepResponse>(`${this.API_URL}${cep}/json/`);
  }
}
