import { store } from './../../application/store/configureStore';
import { FTRepositoryDatabase } from './../repository/FTRepositoryDatabase';

// export const fetchFTs = async (setFTs: any) => {
//   const { user, isAdmin } = store.getState().auth;
//   const { adminSelectedCompanyId, userCompanyId } = store.getState().companies;

//   const repo = new FTRepositoryDatabase();
//   const fts = await repo.getFTs();
//   setFTs(fts);
// };

export const fetchFTs = async (setFTs: any) => {
  const { user, isAdmin } = store.getState().auth;
  const { adminSelectedCompanyId, userCompanyId } = store.getState().companies;
  const repo = new FTRepositoryDatabase();

  if (isAdmin && adminSelectedCompanyId) {
    const shouldGetAll = adminSelectedCompanyId === 'Todas';

    if (shouldGetAll) {
      const fts = await repo.adminGetAllFTs();
      setFTs(fts);
    } else {
      const fts = await repo.getFTsFromCompanyId(adminSelectedCompanyId!);
      setFTs(fts);
    }
  } else if (!isAdmin && userCompanyId) {
    const fts = await repo.getFTsFromCompanyId(userCompanyId!);
    setFTs(fts);
  }
};
