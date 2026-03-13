export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'EDITOR';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
