/** Response returned by POST /api/auth/login. */
export interface AuthUser {
  id: number | string;
  username: string;
  roles: string[];
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: AuthUser;
}
