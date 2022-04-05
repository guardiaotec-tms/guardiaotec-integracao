import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { Vinculo } from '../../../domain/entities/Vinculo';
import { useEffect } from 'react';
import { useState } from 'react';
import { VinculoRepositoryDatabase } from '../../../infra/repository/VinculoRepositoryDatabase';
import { RootState } from '../../../application/store/configureStore';
import { useSelector } from 'react-redux';
import { fetchVinculos } from '../../../infra/services/fetchVinculos';
import { CompanyFilter } from '../../components/Filter/CompanyFilter';
import { canRegister } from '../../../application/service/canRegister';
import { TargetFilter } from '../Common/TargetFilter';
import { RowCommand } from '../../components/Table/TableRowOptions';
import { selectCurrentRelatedCompanyId } from '../../../infra/services/selectCurrentRelatedCompanyId';
import { DeleteConfirmDialog } from '../Common/DeleteConfirmDialog';

type Props = {};

export const VinculoPage: FunctionComponent<Props> = ({}) => {
  const [vinculos, setVinculos] = useState<Vinculo[]>([]);
  const [filteredVinculos, setFilteredVinculos] = useState<Vinculo[]>([]);
  const [inEdit, setInEdit] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [targetCommandVinculo, setTargetCommandVinculo] = useState<Vinculo>();
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );
  const { userId, isAdmin, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (adminSelectedCompanyId || userCompanyId) {
      fetchVinculos(setVinculos);
    }
  }, [adminSelectedCompanyId, userCompanyId]);

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const vinculo of filteredVinculos) {
      rows.push([
        vinculo.values['Transportadora'],
        vinculo.values['Motorista (CNH)'],
        vinculo.values['Veículo (Placa)'],
        vinculo.values.LTU,
        vinculo.values['Nº da FT'],
      ]);
    }
    return rows;
  };

  const vinculosTableHead = [
    'Transportadora',
    'Motorista (CNH)',
    'Veículo (Placa)',
    'LTU',
    'Nº da FT',
    '',
  ];

  const vinculosTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    const vinculo = vinculos.find((v) => v.values['Nº da FT'] === row[4]);
    if (!vinculo) return;
    setTargetCommandVinculo(vinculo);
    if (command === 'edit') setInEdit(true);
    if (command === 'delete') setInDelete(true);
  };

  const onEditClose = () => {
    setInEdit(false);
    fetchVinculos(setVinculos);
  };

  const onDeleteClose = () => {
    setInDelete(false);
    fetchVinculos(setVinculos);
  };

  const onDelete = async (vinculoId: string) => {
    const repo = new VinculoRepositoryDatabase();
    let companyId = await selectCurrentRelatedCompanyId();
    if (!companyId)
      throw new Error(
        'Id de transportadora não identificado! Impossível deletar veículo!'
      );
    await repo.deleteVinculo(companyId, vinculoId);
  };

  return (
    <div>
      <ResponsiveAppBar />
      {isAdmin && <CompanyFilter />}
      <TargetFilter
        targets={vinculos}
        setFilteredTargets={setFilteredVinculos}
        filterField='LTU'
        filterName='LTU'
      />
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/vinculo/register`}
          variant='contained'
          color='primary'
          disabled={!canRegister()}
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={vinculosTableHead}
        tableRows={vinculosTableRows}
        onRowCommand={onRowCommand}
      />
      {/* {inEdit && (
        <EditVinculoForm
          open={inEdit}
          onClose={onEditClose}
          vehicle={targetCommandVehicle!}
          vehicleId={targetCommandVehicle!.values.Id!}
        />
      )} */}
      {inDelete && (
        <DeleteConfirmDialog
          open={inDelete}
          onClose={onDeleteClose}
          targetId={targetCommandVinculo!.values.Id!}
          targetName={'Vínculo'}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};
