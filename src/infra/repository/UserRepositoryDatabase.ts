import { serverUrl } from './serverUrl';

export class UserRepositoryDatabase {
  constructor() {}

  async createUser(email: string, password: string) {
    const body = {
      email,
      password,
    };

    const response = await fetch(serverUrl(), {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => res.json());

    console.log(response, 'response');

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }
}
