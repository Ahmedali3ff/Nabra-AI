import { vi } from "vitest";

/**
 * Replaces localStorage with an in-memory store backed by vi.spyOn.
 * Call in beforeEach to get a clean store for each test.
 */
export function mockLocalStorage() {
  const store = {};
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(
    (key) => store[key] ?? null
  );
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(
    (key, value) => { store[key] = String(value); }
  );
  vi.spyOn(Storage.prototype, "removeItem").mockImplementation(
    (key) => { delete store[key]; }
  );
  vi.spyOn(Storage.prototype, "clear").mockImplementation(
    () => { Object.keys(store).forEach((k) => delete store[k]); }
  );
}

/**
 * Makes localStorage.setItem throw QuotaExceededError to simulate a full store.
 */
export function mockLocalStorageFailure() {
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new DOMException("QuotaExceededError", "QuotaExceededError");
  });
}
