import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Driver } from '../../../domain/entities/Driver';
import { DriverRepositoryDatabase } from '../../../infra/repository/DriverRepositoryDatabase';
import moment from 'moment';
import { RootState } from '../../../application/store/configureStore';
import { CompanyFilter } from '../../components/Filter/CompanyFilter';
import { canRegister } from '../../../application/service/canRegister';
import { TargetFilter } from '../Common/TargetFilter';
import { RowCommand } from '../../components/Table/TableRowOptions';
import { EditDriverForm } from '../../components/Forms/Driver/EditDriverForm';
import { fetchDrivers } from '../../../infra/services/fetchDrivers';
import { DeleteConfirmDialog } from '../Common/DeleteConfirmDialog';
import { selectCurrentRelatedCompanyId } from '../../../infra/services/selectCurrentRelatedCompanyId';
import { DocumentButtonDialog } from '../Common/DocumentButtonDialog';

type Props = {};

export const DriverPage: FunctionComponent<Props> = ({}) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [inEdit, setInEdit] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [targetCommandDriver, setTargetCommandDriver] = useState<Driver>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    fetchDrivers(setDrivers);
  }, [adminSelectedCompanyId, userCompanyId]);

  const hasDocumentFile = (driver: Driver) => {
    if (!driver.values.driverDocumentFileData) return false;
    const { filename, filenameInStorage } =
      driver.values.driverDocumentFileData;
    return !!filename && !!filenameInStorage;
  };

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const driver of filteredDrivers) {
      const driverFileComponent = hasDocumentFile(driver) ? (
        <DocumentButtonDialog
          documentFileData={driver.values.driverDocumentFileData}
          alt='Imagem da CNH do Motorista'
        />
      ) : (
        ''
      );

      rows.push([
        driver.values.nome,
        driver.values.contato,
        driver.values.cnh,
        moment(driver.values.vencimento).format('MM/YYYY'),
        //@ts-ignore
        driverFileComponent,
      ]);
    }
    return rows;
  };

  const driversTableHead = [
    'Nome',
    'Contato',
    'CNH',
    'Vencimento CNH',
    'Arquivo da CNH',
    '', // necessário para a simetria da tabela
  ];
  const driversTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    const driver = drivers.find((d) => d.values.cnh === row[2]);
    if (!driver) return;
    setTargetCommandDriver(driver);
    if (command === 'edit') setInEdit(true);
    if (command === 'delete') setInDelete(true);
  };

  const onEditClose = () => {
    setInEdit(false);
    fetchDrivers(setDrivers);
  };

  const onDeleteClose = () => {
    setInDelete(false);
    fetchDrivers(setDrivers);
  };

  const onDelete = async (driverId: string) => {
    const repo = new DriverRepositoryDatabase();
    let companyId = await selectCurrentRelatedCompanyId();
    if (!companyId)
      throw new Error(
        'Id de transportadora não identificado! Impossível deletar motorista!'
      );
    await repo.deleteDriver(companyId, driverId);
  };

  return (
    <div>
      <ResponsiveAppBar />
      <div>
        {isAdmin && <CompanyFilter />}
        <TargetFilter
          targets={drivers}
          setFilteredTargets={setFilteredDrivers}
          filterField='nome'
          filterName='Motorista'
        />
        <Box
          sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
        >
          <Button
            component={Link}
            to={`/driver/register`}
            variant='contained'
            color='primary'
            disabled={!canRegister()}
          >
            Cadastrar
          </Button>
        </Box>
      </div>
      <CustomTable
        tableHead={driversTableHead}
        tableRows={driversTableRows}
        onRowCommand={onRowCommand}
      />
      {inEdit && (
        <EditDriverForm
          open={inEdit}
          onClose={onEditClose}
          driver={targetCommandDriver!}
          driverId={targetCommandDriver!.values.Id!}
        />
      )}
      {inDelete && (
        <DeleteConfirmDialog
          open={inDelete}
          onClose={onDeleteClose}
          targetId={targetCommandDriver!.values.Id!}
          targetName={'Motorista'}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};
