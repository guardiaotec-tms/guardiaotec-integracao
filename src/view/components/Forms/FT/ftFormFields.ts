import { IFormField } from '../../../../domain/entities/FormField';

export const ftFormFields = () => {
  const ftFields: IFormField[] = [
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
