export interface GetUserPayload {
  userId?: number;
}

export interface GetUserSuccessPayload {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
}
