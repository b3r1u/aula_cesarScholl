import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'https://api.brevo.com/v3/smtp/email';

  private apiKey =
    'Sua_chave_de_API_aqui';

  constructor(private http: HttpClient) {}

  enviarEmail(
    destinatario: string,
    nome: string,
    assunto: string,
    conteudo: string
  ): Observable<any> {
    const body = {
      sender: {
        name: 'Cadastro Angular',
        email: 'email_de_envio@seu_dominio.com',
      },
      to: [{ email: destinatario, name: nome }],
      subject: assunto,
      htmlContent: `<html><body><h1>${conteudo}</h1></body></html>`,
    };

    const headers = new HttpHeaders({
      'api-key': this.apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post(this.apiUrl, body, { headers });
  }
}
