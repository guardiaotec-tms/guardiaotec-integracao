type DriverValues = {
  nome: string;
  cnh: string;
  contato: string;
  vencimento: Date;
  Id?: string;
};

export class Driver {
  constructor(readonly values: DriverValues) {}
}
