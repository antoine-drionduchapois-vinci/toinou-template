import { Injectable } from '@angular/core';

export const TOKEN_NAME = 'toinou-template-token';

@Injectable()
export class TokenService {
  useLocalStorage = true;

  setToken(token: string): void {
    if (token !== undefined) {
      this.storage.setItem(TOKEN_NAME, token);
    } else {
      this.storage.removeItem(TOKEN_NAME);
    }
  }

  getToken(): string {
    return this.storage.getItem(TOKEN_NAME);
  }

  private get storage() {
    return this.useLocalStorage ? localStorage : sessionStorage;
  }
}
