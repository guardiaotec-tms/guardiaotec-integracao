type FTValues = {
  'Origem/Destino': string;
  'Nº da FT': string;
  'Nº da Linha': string;
  'Data de Vigencia Inicial': Date;
  Frequência: string[];
  Sentido: string;
  // Sequencia: string;
  // 'Ponto De Parada': string;
  // Chegada: string;
  // Partida: string;
  // Serviço: string;
  // Espera: string;
  // Livre: string;
  // Horas: string;
  // Serviços: string;
  // Endereço: string;
  // Frequência: string[];
  // LTU: string;
};

export class FT {
  constructor(readonly values: FTValues) {}
}
