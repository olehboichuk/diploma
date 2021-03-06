export interface ILoginModel {
  login: string;
  password: string;
}

export interface IRegisterModel extends ILoginModel {
  first_name: string;
  last_name: string;
}

export interface ILoginResponseModel {
  auth?: boolean;
  token?: string;
  active?: boolean;
  login?: string;
  message?: string;
}
