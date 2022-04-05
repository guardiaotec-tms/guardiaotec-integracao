import { IFormField } from '../../../../domain/entities/FormField';

export const companyFormFields = () => {
  const companyFields: IFormField[] = [
    { label: 'Numero de Contrato', type: 'Short Text', id: 0, index: 0 },
    { label: 'Código', type: 'Short Text', id: 1, index: 1 },
    { label: 'Transportadora', type: 'Short Text', id: 2, index: 2 },
    { label: 'CNPJ', type: 'CNPJ', id: 3, index: 3 },
    { label: 'Contato', type: 'Phone Number', id: 4, index: 4 },
    { label: 'Email', type: 'Email', id: 5, index: 5 },
    { label: 'Responsável', type: 'Short Text', id: 6, index: 6 },
  ];
  return companyFields;
};
