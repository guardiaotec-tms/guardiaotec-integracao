export class UserRepositoryDatabase {
  constructor() {}

  async createUser(email: string, password: string) {
    const body = {
      email,
      password,
    };

    const serverUrl =
      'https://us-central1-guardiaotec-tms-prototype.cloudfunctions.net/createUser';

    const response = await fetch(serverUrl, {
      method: 'POST',
      body: JSON.stringify(body),
    }).then((res) => res.json());

    console.log(response, 'response');
  }
}
