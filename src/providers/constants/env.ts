// SERVERS
export const REST_PORT = Bun.env.REST_PORT ?? "3000";
export const RPC_PORT = Bun.env.RPC_PORT ?? "3001";

// LOGS
export const LOG_LEVEL = Bun.env.LOG_LEVEL ?? "info";

// SUPABASE
export const SUPA_URL = Bun.env.SUPA_URL ?? "";
export const SUPA_KEY = Bun.env.SUPA_KEY ?? "";

// GOTRUE
export const GO_TRUE_URL = Bun.env.GO_TRUE_URL ?? "";
