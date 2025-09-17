export interface IUser {
  id?: string;
  email: string;
  password: string;
}

export class User implements IUser {
  constructor(
    public email: string,
    public password: string,
    public id?: string
  ) {}
}
