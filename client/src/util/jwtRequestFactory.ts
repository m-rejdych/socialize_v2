import axios from 'axios';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestSettings<T = {}> {
  url: string;
  method: Method;
  body?: T;
}

interface Headers {
  Authorization: string;
}

const clearStorage = (): null => {
  localStorage.clear();
  return null;
};

const getToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) clearStorage();

  const expiresIn = localStorage.getItem('expiresIn');
  if (!expiresIn || Number(expiresIn) < Date.now()) clearStorage();

  return token;
};

const getAuthorizationHeaders = (): Headers => {
  const token = getToken();

  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

const createJwtRequest = <T, U = {}>({
  url,
  method,
  body,
}: RequestSettings<U>): Promise<T> => {
  const headers = getAuthorizationHeaders();

  switch (method) {
    case 'POST':
      return axios.post(url, body, { headers });
    case 'PUT':
      return axios.put(url, body, { headers });
    case 'DELETE':
      return axios.delete(url, { headers });
    case 'GET':
    default:
      return axios.get(url, { headers });
  }
};

export default createJwtRequest;
