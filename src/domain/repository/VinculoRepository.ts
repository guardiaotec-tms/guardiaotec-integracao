import { Vinculo } from '../entities/Vinculo';

export interface VinculoRepository {
  addVinculo(vinculo: Vinculo): Promise<void>;
  getVinculos(): Promise<Vinculo[]>;
}
