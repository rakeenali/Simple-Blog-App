export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
}

export interface IToken {
  token: string;
}

export interface ILogin {
  email: string;
  password: string;
}
