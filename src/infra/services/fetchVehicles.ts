import { store } from './../../application/store/configureStore';
import { VehicleRepositoryDatabase } from '../repository/VehicleRepositoryDatabase';

export const fetchVehicles = async (setVehicles: any) => {
  const { user, isAdmin } = store.getState().auth;
  const { adminSelectedCompanyId, userCompanyId } = store.getState().companies;
  const repo = new VehicleRepositoryDatabase();

  if (isAdmin && adminSelectedCompanyId) {
    const shouldGetAll = adminSelectedCompanyId === 'Todas';

    if (shouldGetAll) {
      const vehicles = await repo.adminGetAllVehicles();
      setVehicles(vehicles);
    } else {
      const vehicles = await repo.getVehiclesFromCompanyId(
        adminSelectedCompanyId!
      );
      setVehicles(vehicles);
    }
  } else if (!isAdmin && userCompanyId) {
    const vehicles = await repo.getVehiclesFromCompanyId(userCompanyId!);
    setVehicles(vehicles);
  }
};
