import { db } from './../../firebase/firebase';
import {
  addDoc,
  Firestore,
  collection,
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
    const q = query(colRef, where('cnh', '==', driver.cnh));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0)
      throw new Error('Motorista já cadastrado com essa cnh');

    const data = {
      cnh: driver.cnh,
      nome: driver.nome,
      contato: driver.contato,
      vencimento: driver.vencimento,
    };
    const driversCollectionRef = collection(db, 'drivers');
    addDoc(driversCollectionRef, data);
  }
  async getDrivers(): Promise<Driver[]> {
    const colRef = collection(this.db, 'drivers');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    let drivers: Driver[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      data.vencimento = data.vencimento.toDate();
      drivers.push(data);
    });
    return drivers;
  }
}
