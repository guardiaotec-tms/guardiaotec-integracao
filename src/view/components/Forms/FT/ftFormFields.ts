import { IFormField } from '../../../../domain/entities/FormField';

export const ftFormFields = () => {
  const ftFields: IFormField[] = [
    { label: 'Numero de Contrato', type: 'Short Text', id: 0, index: 0 },
    { label: 'Código', type: 'Short Text', id: 1, index: 1 },
    { label: 'Origem/Destino', type: 'Short Text' },
    { label: 'Nº da FT', type: 'Short Text' },
    { label: 'Nº da Linha', type: 'Short Text' },
    { label: 'Data de Vigencia Inicial', type: 'Date' },
    {
      label: 'Frequência',
      type: 'Checkbox',
      options: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    },
    { label: 'Sentido', type: 'Short Text' },
  ];
  return ftFields;
};
