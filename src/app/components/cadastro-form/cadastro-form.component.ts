import { Component, EventEmitter, Output } from '@angular/core';
import { Registro } from '../../model/registro.model';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CepService } from '../../services/cep.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-cadastro-form',
  templateUrl: './cadastro-form.component.html',
  styleUrl: './cadastro-form.component.scss',
})
export class CadastroFormComponent {
  @Output() submitted = new EventEmitter<Registro>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private emailService: EmailService
  ) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      endereco: ['', [Validators.required, Validators.minLength(5)]],
      cep: ['', [Validators.required, Validators.minLength(8)]],
      bairro: ['', [Validators.required]],
      localidade: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      cpf: ['', [Validators.required, this.cpfValidator]],
    });
  }

  cpfValidator(control: AbstractControl) {
    const value = (control.value || '').replace(/\D/g, '');
    if (!value) return null;
    if (value.length !== 11) return { cpfInvalid: true };

    if (/^(\d)\1{10}$/.test(value)) return { cpfInvalid: true };

    const calc = (digits: string, factor: number) => {
      let total = 0;
      for (let i = 0; i < digits.length; i++) {
        total += parseInt(digits.charAt(i), 10) * (factor - i);
      }
      const rest = (total * 10) % 11;
      return rest === 10 ? 0 : rest;
    };

    const d1 = calc(value.slice(0, 9), 10);
    const d2 = calc(value.slice(0, 10), 11);

    if (
      d1 !== parseInt(value.charAt(9), 10) ||
      d2 !== parseInt(value.charAt(10), 10)
    ) {
      return { cpfInvalid: true };
    }
    return null;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onCepChange() {
    const cep = this.f['cep'].value?.replace(/\D/g, '');
    if (cep && cep.length === 8) {
      this.cepService.buscarCep(cep).subscribe({
        next: (data) => {
          if (data && data.logradouro) {
            this.f['endereco'].setValue(data.logradouro);
            this.f['bairro'].setValue(data.bairro);
            this.f['localidade'].setValue(data.localidade);
            this.f['uf'].setValue(data.uf);
          }
        },
        error: (err) => {
          console.error('Erro ao buscar CEP:', err);
        },
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Registro = this.form.value;

    this.emailService
      .enviarEmail(
        payload.email,
        payload.fullName,
        'Cadastro realizado com sucesso!',
        `Olá ${payload.fullName}, seu cadastro foi realizado com sucesso!`
      )
      .subscribe({
        next: (res) => {
          console.log('Email enviado com sucesso:', res);
          this.submitted.emit(payload);
          this.form.reset();
        },
        error: (err) => {
          console.error('Erro ao enviar email:', err);
        },
      });
  }
}
