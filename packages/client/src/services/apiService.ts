//import { IServices } from '@/redux/store'
import { ISignIn } from '@/types/types'

export class ApiService {
  constructor(private _service: any) {}
  async getUser() {
    const response = await this._service.user();
    return response.data;
    //return this._service.getUser()
  }
  async signIn(values: ISignIn) {
    return await this._service.signin(values);//this._service.signIn(signInData)
  }
  async logout() {
    await this._service.logout();
    //return this._service.logout()
  }
}
