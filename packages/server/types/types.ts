export interface IUserData {
  id?: number | null;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  password?: string;
  phone: string;
  avatar?: string;
}
