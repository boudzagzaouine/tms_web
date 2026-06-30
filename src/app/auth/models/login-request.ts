/** Payload sent to POST /api/auth/login. The plain password is hashed (MD5) server-side. */
export interface LoginRequest {
  email: string;
  password: string;
}
