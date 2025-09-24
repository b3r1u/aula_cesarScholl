import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCardsComponent } from './cadastro-cards.component';

describe('CadastroCardsComponent', () => {
  let component: CadastroCardsComponent;
  let fixture: ComponentFixture<CadastroCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
