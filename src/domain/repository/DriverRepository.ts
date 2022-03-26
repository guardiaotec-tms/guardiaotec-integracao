import { SetDriversType } from './../../application/store/features/drivers/driversSlice';
import { Driver } from '../entities/Driver';

export interface DriverRepository {
  addDriver(driver: Driver): Promise<void>;
  // updateDriver(): void;
  // deleteDriver(): void;
  // getDriver(): void;
  getDrivers(): Promise<Driver[]>;
  // getDrivers(setDrivers: SetDriversType): Promise<void>;
}
