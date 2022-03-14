import { Vehicle } from './../../domain/entities/Vehicle';
import {
  addDoc,
  Firestore,
  collection,
  getDocs,
  where,
  query,
} from 'firebase/firestore/lite';
import { db } from './../../firebase/firebase';
import { VehicleRepository } from '../../domain/repository/VehicleRepository';

export class VehicleRepositoryDatabase implements VehicleRepository {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async addVehicle(vehicle: Vehicle): Promise<void> {
    const colRef = collection(this.db, 'vehicles');
    const q = query(colRef, where('Placa', '==', vehicle.values.Placa));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0)
      throw new Error('Veículo com esta placa já foi cadastrado!');

    const data = {
      Marca: vehicle.values.Marca,
      Modelo: vehicle.values.Modelo,
      Cor: vehicle.values.Cor,
      'Ano Fabricação': vehicle.values['Ano Fabricação'],
      'Ano Modelo': vehicle.values['Ano Modelo'],
      Placa: vehicle.values.Marca,
      'Capacidade(m3)': vehicle.values['Capacidade(m3)'],
    };
    const vehiclesCollectionRef = collection(db, 'vehicles');
    addDoc(vehiclesCollectionRef, data);
  }

  async getVehicles(): Promise<Vehicle[]> {
    const colRef = collection(this.db, 'vehicles');
    const q = query(colRef);
    const querySnapshot = await getDocs(q);
    let vehicles: Vehicle[] = [];
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      data['Ano Fabricação'] = data['Ano Fabricação'].toDate();
      data['Ano Modelo'] = data['Ano Modelo'].toDate();
      vehicles.push(new Vehicle(data));
    });
    return vehicles;
  }
}
