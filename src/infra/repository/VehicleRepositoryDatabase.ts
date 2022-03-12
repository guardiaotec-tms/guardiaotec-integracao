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
import { db } from './../../firebase/firebase';
import { Vehicle } from '../../domain/entities/Vehicle';
import { VehicleRepository } from '../../domain/repository/VehicleRepository';

export class VehicleRepositoryDatabase implements VehicleRepository {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addVehicle(vehicle: Vehicle): Promise<void> {
    const colRef = collection(this.db, 'vehicles');
    const q = query(colRef, where('serialNumber', '==', vehicle.serialNumber));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0)
      throw new Error('Veículo com este númera já foi cadastrado!');

    const data = {
      cpf: vehicle.serialNumber,
      year: vehicle.year,
    };
    const vehiclesCollectionRef = collection(db, 'vehicles');
    addDoc(vehiclesCollectionRef, data);
  }
  async getVehicles(): Promise<Vehicle[]> {
    throw new Error('Method not implemented.');
  }
}
