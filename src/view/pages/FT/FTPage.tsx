import React, { FunctionComponent } from 'react';
import { Box, Button } from '@mui/material';
import { ResponsiveAppBar } from '../../components/Common/AppBar';
import { Link } from 'react-router-dom';
import { CustomTable } from '../../components/Table/CustomTable';
import { FT } from '../../../domain/entities/FT';
import { useEffect } from 'react';
import { useState } from 'react';
import { FTRepositoryDatabase } from '../../../infra/repository/FTRepositoryDatabase';
import moment from 'moment';
import { fetchFTs } from '../../../infra/services/fetchFTs';
import { CompanyFilter } from '../../components/Filter/CompanyFilter';
import { useSelector } from 'react-redux';
import { RootState } from '../../../application/store/configureStore';
import { canRegister } from '../../../application/service/canRegister';
import { TargetFilter } from '../Common/TargetFilter';
import { RowCommand } from '../../components/Table/TableRowOptions';
import { EditFTForm } from '../../components/Forms/FT/EditFTForm';
import { DeleteConfirmDialog } from '../Common/DeleteConfirmDialog';
import { selectCurrentRelatedCompanyId } from '../../../infra/services/selectCurrentRelatedCompanyId';
import { DocumentButtonDialog } from '../Common/DocumentButtonDialog';

type Props = {};

export const FTPage: FunctionComponent<Props> = ({}) => {
  const [fts, setFTs] = useState<FT[]>([]);
  const [filteredFTs, setFilteredFTS] = useState<FT[]>([]);
  const [inEdit, setInEdit] = useState(false);
  const [inDelete, setInDelete] = useState(false);
  const [targetCommandFT, setTargetCommandFT] = useState<FT>();
  const { userId, isAdmin } = useSelector((state: RootState) => state.auth);
  const { userCompanyId, adminSelectedCompanyId } = useSelector(
    (state: RootState) => state.companies
  );

  useEffect(() => {
    fetchFTs(setFTs);
    // if (adminSelectedCompanyId || userCompanyId) {
    // }
  }, [adminSelectedCompanyId, userCompanyId]);

  const hasDocumentFile = (ft: FT) => {
    if (!ft.values.ftDocumentFileData) return false;
    const { filename, filenameInStorage } = ft.values.ftDocumentFileData;
    return !!filename && !!filenameInStorage;
  };

  const makeTableRows = () => {
    let rows: string[][] = [];
    for (const ft of filteredFTs) {
      const ftFileComponent = hasDocumentFile(ft) ? (
        <DocumentButtonDialog
          documentFileData={ft.values.ftDocumentFileData}
          alt='Arquivo da Ficha T??cnica'
        />
      ) : (
        ''
      );

      rows.push([
        ft.values['Numero de Contrato'],
        ft.values['C??digo'],
        ft.values['Origem/Destino'],
        ft.values['N?? da FT'],
        ft.values['N?? da Linha'],
        moment(ft.values['Data de Vigencia Inicial']).format('DD/MM/YY'),
        ft.values['Frequ??ncia'].join(','),
        ft.values.Sentido,
        //@ts-ignore
        ftFileComponent,
      ]);
    }
    return rows;
  };

  const ftsTableHead = [
    'Numero de Contrato',
    'C??digo',
    'Origem/Destino',
    'N?? da FT',
    'N?? da Linha',
    'Data de Vigencia Inicial',
    'Frequ??ncia',
    'Sentido',
    'Arquivo da Ficha T??cnica',
    '',
  ];
  const ftsTableRows = makeTableRows();

  const onRowCommand = (command: RowCommand, row: string[]) => {
    const ft = fts.find((ft) => ft.values['N?? da FT'] === row[3]);
    if (!ft) return;
    setTargetCommandFT(ft);
    if (command === 'edit') setInEdit(true);
    if (command === 'delete') setInDelete(true);
  };

  const onEditClose = () => {
    setInEdit(false);
    fetchFTs(setFTs);
  };

  const onDeleteClose = () => {
    setInDelete(false);
    fetchFTs(setFTs);
  };

  const onDelete = async (ftId: string) => {
    const repo = new FTRepositoryDatabase();
    let companyId = await selectCurrentRelatedCompanyId();
    if (!companyId)
      throw new Error(
        'Id de transportadora n??o identificado! Imposs??vel deletar Ficha T??cnica!'
      );
    await repo.deleteFT(companyId, ftId);
  };

  return (
    <div>
      <ResponsiveAppBar />
      {isAdmin && <CompanyFilter />}
      <TargetFilter
        targets={fts}
        setFilteredTargets={setFilteredFTS}
        filterField='N?? da FT'
        filterName='N?? da FT'
      />
      <Box
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mb: 2 }}
      >
        <Button
          component={Link}
          to={`/workscale/register`}
          variant='contained'
          color='primary'
          disabled={!canRegister()}
        >
          Cadastrar
        </Button>
      </Box>
      <CustomTable
        tableHead={ftsTableHead}
        tableRows={ftsTableRows}
        onRowCommand={onRowCommand}
      />
      {inEdit && (
        <EditFTForm
          open={inEdit}
          onClose={onEditClose}
          ft={targetCommandFT!}
          ftId={targetCommandFT!.values.Id!}
        />
      )}
      {inDelete && (
        <DeleteConfirmDialog
          open={inDelete}
          onClose={onDeleteClose}
          targetId={targetCommandFT!.values.Id!}
          targetName={'Ficha T??cnica'}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};
