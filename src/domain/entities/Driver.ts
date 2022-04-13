type DriverValues = {
  nome: string;
  cnh: string;
  contato: string;
  vencimento: Date;
  Id?: string;
  driverDocumentFileData: {
    filename: string;
    filenameInStorage: string;
  };
};

export class Driver {
  constructor(readonly values: DriverValues) {}
}
