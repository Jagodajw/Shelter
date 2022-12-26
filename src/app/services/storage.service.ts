import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  set(
    name: string,
    value: unknown,
    storage: 'local' | 'session' = 'local'
  ): void {
    storage === 'local'
      ? localStorage.setItem(name, JSON.stringify(value))
      : sessionStorage.setItem(name, JSON.stringify(value));
  }

  get(
    name: string,
    storage: 'local' | 'session' = 'local',
    options: { ignorePrefix: boolean } = { ignorePrefix: true }
  ): any {
    const value: string | null =
      storage === 'local'
        ? localStorage.getItem(name)
        : sessionStorage.getItem(name);

    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  clear(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
