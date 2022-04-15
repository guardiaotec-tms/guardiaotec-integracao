import { User } from './../../domain/entities/User';
import { db } from './../../firebase/firebase';
import { getDocs, collection } from 'firebase/firestore';
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

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async getUsers() {
    const usersCollection = collection(db, 'users');
    const querySnapshot = await getDocs(usersCollection);

    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      const data: any = doc.data();
      data.Id = doc.id;
      users.push(new User(data));
    });
    return users;
  }
}
