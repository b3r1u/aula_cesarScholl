import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroFormComponent } from './components/cadastro-form/cadastro-form.component';
import { CadastroCardsComponent } from './components/cadastro-cards/cadastro-cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CpfMaskPipe } from './pipes/cpf-mask.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CadastroFormComponent,
    CadastroCardsComponent,
    CpfMaskPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    HttpClientModule,
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
