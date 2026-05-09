export interface IIdempotencyStore {
    exists(id: string): Promise<boolean>;
    save(id: string): Promise<void>;
}

export const IDEMPOTENCY_STORE = Symbol("IDEMPOTENCY_STORE");