import { SetDriversType } from './../../application/store/features/drivers/driversSlice';
import { db } from './../../firebase/firebase';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
  getDoc,
  collectionGroup,
  Query,
  DocumentData,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Driver } from '../../domain/entities/Driver';
import { DriverRepository } from './../../domain/repository/DriverRepository';

// export class DriverRepositoryDatabase implements DriverRepository {
export class DriverRepositoryDatabase {
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
    // async getDrivers(setDrivers: SetDriversType): Promise<void> {
    const colRef = collection(this.db, 'drivers');
    const q = query(colRef);
    return this.getDriversFromQuery(q);

    // const querySnapshot = await getDocs(q);
    // let drivers: Driver[] = [];
    // querySnapshot.forEach((doc: any) => {
    //   const data = doc.data();
    //   data.vencimento = data.vencimento.toDate();
    //   drivers.push(data);
    // });
    // return drivers;
  }

  async getDriversFromCompanyId(companyId: string) {
    const colRef = collection(this.db, `companies/${companyId}/drivers`);
    const q = query(colRef);
    return this.getDriversFromQuery(q);

    // const querySnapshot = await getDocs(q);
    // let drivers: Driver[] = [];
    // querySnapshot.forEach((doc: any) => {
    //   const data = doc.data();
    //   data.vencimento = data.vencimento.toDate();
    //   drivers.push(data);
    // });
    // return drivers;
  }

  async getDriversFromQuery(query: Query<DocumentData>) {
    const querySnapshot = await getDocs(query);
    let drivers: Driver[] = [];
    querySnapshot.forEach((doc) => {
      const data: any = doc.data();
      data.vencimento = data.vencimento.toDate();
      drivers.push(data);
    });
    return drivers;
  }

  async adminGetAllDrivers() {
    const driversQuery = query(collectionGroup(db, 'drivers'));
    return this.getDriversFromQuery(driversQuery);
  }
}
