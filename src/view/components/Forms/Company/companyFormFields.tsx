import { IFormField } from '../../../../domain/entities/FormField';

export const companyFormFields = () => {
  const companyFields: IFormField[] = [
    { label: 'Transportadora', type: 'Short Text', id: 2, index: 2 },
    { label: 'CNPJ', type: 'CNPJ', id: 3, index: 3 },
    { label: 'Contato', type: 'Phone Number', id: 4, index: 4 },
    { label: 'Email', type: 'Email', id: 5, index: 5 },
    { label: 'Responsável', type: 'Short Text', id: 6, index: 6 },
  ];
  return companyFields;
};
