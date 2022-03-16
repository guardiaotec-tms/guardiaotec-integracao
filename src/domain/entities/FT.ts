type FTValues = {
  'Nº da FT': string;
  'Nº da Linha': string;
  Origem: string;
  Destino: string;
  'Data de Vigencia Início': Date;
  'Data de Vigencia Fim': Date;
  'Tipo de Linha': string;
  Frequência: string[];
};

export class FT {
  constructor(readonly values: FTValues) {}
}
