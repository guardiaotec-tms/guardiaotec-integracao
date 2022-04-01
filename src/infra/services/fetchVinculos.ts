import { VinculoRepositoryDatabase } from './../repository/VinculoRepositoryDatabase';
import { store } from './../../application/store/configureStore';
// import { FTRepositoryDatabase } from './../repository/FTRepositoryDatabase';

export const fetchVinculos = async (setVinculos: any) => {
  const { user, isAdmin } = store.getState().auth;
  const { adminSelectedCompanyId, userCompanyId } = store.getState().companies;
  const repo = new VinculoRepositoryDatabase();

  if (isAdmin && adminSelectedCompanyId) {
    const shouldGetAll = adminSelectedCompanyId === 'Todas';

    if (shouldGetAll) {
      const vinculos = await repo.adminGetAllVinculos();
      setVinculos(vinculos);
    } else {
      const vinculos = await repo.getVinculosFromCompanyId(
        adminSelectedCompanyId!
      );
      setVinculos(vinculos);
    }
  } else if (!isAdmin && userCompanyId) {
    const vinculos = await repo.getVinculosFromCompanyId(userCompanyId!);
    setVinculos(vinculos);
  }
};
