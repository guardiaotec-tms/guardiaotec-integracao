type FTValues = {
  'Nº da FT': string;
  'Nº da Linha': string;
  Origem: string;
  Destino: string;
  'Data de Vigencia Início': string;
  'Data de Vigencia Fim': string;
  'Tipo de Linha': string;
  Frequência: string[];
};

export class FT {
  constructor(readonly values: FTValues) {}
}
