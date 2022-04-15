type UserValues = {
  accessType: 'Editor' | 'Administrador';
  email: string;
  Id?: string;
};

export class User {
  constructor(readonly values: UserValues) {}
}
