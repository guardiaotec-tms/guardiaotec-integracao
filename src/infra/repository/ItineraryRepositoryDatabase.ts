import { Itinerary } from './../../domain/entities/Itinerary';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore/lite';
import { db } from './../../firebase/firebase';
import { ItineraryRepository } from '../../domain/repository/ItineraryRepository';

export class ItineraryRepositoryDatabase implements ItineraryRepository {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addItinerary(itinerary: Itinerary): Promise<void> {
    const colRef = collection(this.db, 'itineraries');
    // // const q = query(colRef, where('Placa', '==', itinerary.values.Placa));
    // const q = query(colRef);
    // const querySnapshot = await getDocs(q);

    // if (querySnapshot.docs.length > 0)
    //   throw new Error('Itinerário já cadastrado!');

    addDoc(colRef, itinerary.values);
  }

  async getItineraries(): Promise<Itinerary[]> {
    const colRef = collection(this.db, 'itineraries');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    let itineraries: Itinerary[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      data['Chegada'] = data['Chegada'].toDate();
      data['Partida'] = data['Partida'].toDate();
      itineraries.push(new Itinerary(data));
    });
    return itineraries;
  }
}
