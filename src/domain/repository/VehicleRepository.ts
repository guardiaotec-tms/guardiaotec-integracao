import { Vehicle } from '../entities/Vehicle';

export interface VehicleRepository {
  addVehicle(vehicle: Vehicle): Promise<void>;
  // updateVehicle(): void;
  // deleteVehicle(): void;
  // getVehicle(): void;
  getVehicles(): Promise<Vehicle[]>;
}
