type VinculoValues = {
  Transportadora: string;
  'Motorista (CNH)': string;
  'Veículo (Placa)': string;
  LTU: string;
  'Nº da FT': string;
};

export class Vinculo {
  constructor(readonly values: VinculoValues) {}
}
