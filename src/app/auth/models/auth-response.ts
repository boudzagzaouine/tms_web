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
  // Full user profile (id, email, userGroup.groupHabilitations, owner, ...). Kept as `any` because
  // it is the same rich object the app already uses everywhere via the User model.
  user: any;
}
