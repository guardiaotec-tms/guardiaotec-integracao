import { FTRepositoryDatabase } from './../repository/FTRepositoryDatabase';

export const fetchFTs = async (setFTs: any) => {
  const repo = new FTRepositoryDatabase();
  const fts = await repo.getFTs();
  setFTs(fts);
};
