export interface GetUserPayload {
  userId?: number;
}

export interface GetUserSuccessPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
