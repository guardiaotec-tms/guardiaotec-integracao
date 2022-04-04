import { IFormField } from '../../../../domain/entities/FormField';

export const makeInitialFormState = (
  formFields: IFormField[],
  initialState?: any
) => {
  let state: any = {};
  for (const field of formFields) {
    if (initialState) {
      state[field.label] = initialState[field.label];
    } else {
      state[field.label] = '';
    }
  }

  return state;
};
