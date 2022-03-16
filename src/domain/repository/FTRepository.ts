import { FT } from '../entities/FT';

export interface FTRepository {
  addFT(ft: FT): Promise<void>;
  getFTs(): Promise<FT[]>;
}
