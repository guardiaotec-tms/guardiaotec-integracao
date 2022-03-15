import { isValidCNPJ } from '../service/ValidateCNPJ';
import { isValidEmail } from '../service/ValidateEmail';
//NUMERO DE CONTRATO 	CODIGO 	RAZÃO SOCIAL 	CNPJ	CONTATO 	EMAIL 	RESPONSAVEL

type CompanyInput = {
  'Numero de Contrato': string;
  Código: string;
  'Razão Social': string;
  CNPJ: string;
  Contato: string;
  Email: string;
  Responsavel: string;
};

export class Company {
  constructor(readonly values: CompanyInput) {
    this.validate();
  }

  isPositiveInteger(str: string) {
    const num = Number(str);
    if (Number.isInteger(num) && num > 0) return true;
    return false;
  }

  validate() {
    if (!this.isPositiveInteger(this.values['Numero de Contrato']))
      throw new Error('Numero de Contrato deve ser um número!');

    if (!isValidCNPJ(this.values.CNPJ)) throw new Error('CNPJ Inválido');

    if (!isValidEmail(this.values.Email)) throw new Error('Email inválido');
  }
}
