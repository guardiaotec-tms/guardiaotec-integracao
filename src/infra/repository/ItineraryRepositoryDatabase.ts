import { Itinerary } from './../../domain/entities/Itinerary';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
  Query,
  DocumentData,
  collectionGroup,
} from 'firebase/firestore';
import { db } from './../../firebase/firebase';
import { ItineraryRepository } from '../../domain/repository/ItineraryRepository';

export class ItineraryRepositoryDatabase {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addItinerary(itinerary: Itinerary, companyId: string): Promise<void> {
    const colRef = collection(this.db, `companies/${companyId}/itineraries`);
    // // const q = query(colRef, where('Placa', '==', itinerary.values.Placa));
    // const q = query(colRef);
    // const querySnapshot = await getDocs(q);

    // if (querySnapshot.docs.length > 0)
    //   throw new Error('Itinerário já cadastrado!');

    addDoc(colRef, itinerary.values);
  }

  async getItineraries(): Promise<Itinerary[]> {
    const colRef = collection(this.db, 'itineraries');
    return this.getItinerariesFromQuery(colRef);
  }

  async getItinerariesFromQuery(query: Query<DocumentData>) {
    const querySnapshot = await getDocs(query);
    let itineraries: Itinerary[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      data['Chegada'] = data['Chegada'].toDate();
      data['Partida'] = data['Partida'].toDate();
      data['Serviço'] = data['Serviço'].toDate();
      data['Espera'] = data['Espera'].toDate();
      data['Livre'] = data['Livre'].toDate();
      data['Horas'] = data['Horas'].toDate();
      itineraries.push(new Itinerary(data));
    });
    return itineraries;
  }

  async adminGetAllItineraries() {
    const query = collectionGroup(this.db, 'itineraries');
    return this.getItinerariesFromQuery(query);
  }

  async getItinerariesFromCompanyId(companyId: string) {
    const colRef = collection(this.db, `companies/${companyId}/itineraries`);
    return this.getItinerariesFromQuery(colRef);
  }

  async getItinerariesFromLTU(LTU: string) {
    const group = collectionGroup(this.db, 'itineraries');
    console.log(LTU, 'LTU');
    const q = query(group, where('LTU Correspondente', '==', LTU));
    return this.getItinerariesFromQuery(q);
  }
}
