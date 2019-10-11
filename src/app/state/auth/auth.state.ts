export interface AuthState {
  userId: string;
  userName: string;
  token: string;
  isAuthenticated: boolean;
  expirationDate: Date;
}

export const initialAuthState: AuthState = {
  userId: '',
  userName: '',
  token: '',
  isAuthenticated: false,
  expirationDate: null
};

