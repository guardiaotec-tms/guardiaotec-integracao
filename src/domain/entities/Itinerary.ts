type ItineraryValues = {
  Sequencia: string;
  'Ponto De Parada': string;
  Km: string;
  Chegada: string;
  Partida: string;
  Serviço: string;
  Espera: string;
  Livre: string;
  Horas: string;
  Serviços: string;
  Endereço: string;
  LTU: string;
};

//SEQUENCIA 	PONTO DE PARADA 	KM	CHEGADA 	PARTIDA 	SERVIÇO	ESPERA	LIVRE 	HORAS	SERVIÇOS	ENDEREÇO

export class Itinerary {
  constructor(readonly values: ItineraryValues) {}
}
