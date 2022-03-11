import { db } from './../../firebase/firebase';
import {
  doc,
  addDoc,
  Firestore,
  collection,
  getDoc,
  getDocs,
  where,
  query,
} from 'firebase/firestore/lite';
import { Driver } from '../../domain/entities/Driver';
import { DriverRepository } from './../../domain/repository/DriverRepository';

export class DriverRepositoryDatabase implements DriverRepository {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addDriver(driver: Driver): Promise<void> {
    const colRef = collection(this.db, 'drivers');
    const q = query(colRef, where('cpf', '==', driver.cpf.value));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0)
      throw new Error('Motorista já cadastrado com esse cpf');

    const data = {
      cpf: driver.cpf.value,
      name: driver.name,
    };
    const driversCollectionRef = collection(db, 'drivers');
    addDoc(driversCollectionRef, data);
  }
  getDrivers(): Promise<Driver[]> {
    throw new Error('Method not implemented.');
  }
}
