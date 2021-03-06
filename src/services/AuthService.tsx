export const API_URL = process.env.REACT_APP_API_URL;
export const APP_URL = process.env.REACT_APP_URL;

export type Token = {
  token: string;
  refreshToken: string;
};

export enum AuthResponse {
  Success = 0,
  WrongPassword = 1,
  UnknownError = 2,
}

export enum RefreshResponse {
  Success = 0,
  Expired = 1,
  NotLoggedIn = 2,
  UnknownError = 3,
}

export class AuthService {
  static async login(username: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const text = await response.text();
    const data = JSON.parse(text);

    if (!response.ok) {
      if (data.error === 'Niepoprawna nazwa użytkownika lub hasło.') {
        return AuthResponse.WrongPassword;
      } else {
        return AuthResponse.UnknownError;
      }
    }

    localStorage.setItem('token', JSON.stringify(data));

    return AuthResponse.Success;
  }

  static async refreshToken(): Promise<RefreshResponse> {
    const user = this.getToken();
    if (!user) {
      return RefreshResponse.NotLoggedIn;
    }

    const response = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.refreshToken}` },
    });

    const text = await response.text();
    const data = JSON.parse(text);

    if (!response.ok) {
      if (response.status === 401) {
        this.logout();
        return RefreshResponse.Expired;
      }
      return RefreshResponse.UnknownError;
    }

    localStorage.setItem('token', JSON.stringify(data));
    return RefreshResponse.Success;
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static getToken(): Token | null {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      return JSON.parse(storedToken);
    } else {
      return null;
    }
  }
}
