export interface LoginReqInterface {
  email: string;
  password: string;
}

export interface RegisterReqInterface extends LoginReqInterface {
  firstName: string;
  lastName: string;
}
