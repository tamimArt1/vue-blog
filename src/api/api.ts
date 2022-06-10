import type { User } from '@/utils/interfaces';
import axios, { type AxiosInstance } from 'axios';

class UserApi {
  driver: AxiosInstance;

  constructor() {
    this.driver = axios.create({
      baseURL: 'http://localhost:5000/api/',
    });
  }

  async getAll(): Promise<User[]> {
    return (await this.driver.get('/users')).data;
  }
  async getUser(id: string): Promise<User> {
    return (await this.driver.get(`/users/${id}`)).data;
  }
  async add(newUser: User): Promise<User> {
    const resp = await this.driver.post('/users', newUser);
    return resp.data;
  }
  async validUser(info: User): Promise<User> {
    const resp = await this.driver.post('/users/validuser', info);
    return resp.data;
  }
}

export const userClient = new UserApi();
