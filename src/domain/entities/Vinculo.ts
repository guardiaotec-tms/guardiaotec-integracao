type VinculoValues = {
  'Transportadora (CNPJ)': string;
  'Motorista (CNH)': string;
  'Veículo (Placa)': string;
  'Nº da FT': string;
};

export class Vinculo {
  constructor(readonly values: VinculoValues) {}
}
