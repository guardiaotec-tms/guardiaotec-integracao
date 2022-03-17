type VinculoValues = {
  'Transportadora (CNPJ)': string;
  'Motorista (CNH)': string;
  'Veículo (Placa)': string;
  'Linha de Distribuição (LTU)': string;
  'Escala de Trabalho (LTU)': string;
};

export class Vinculo {
  constructor(readonly values: VinculoValues) {}
}
