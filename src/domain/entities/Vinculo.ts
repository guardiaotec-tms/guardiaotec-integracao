type VinculoValues = {
  Transportadora: string;
  Motorista: string;
  Veículo: string;
  'Plano de Viagem': string;
  'Ficha Técnica': string;
  Id?: string;
};

export class Vinculo {
  constructor(readonly values: VinculoValues) {}
}
