type DriverValues = {
  nome: string;
  cnh: string;
  contato: string;
  vencimento: Date;
};

export class Driver {
  constructor(readonly values: DriverValues) {}
}
