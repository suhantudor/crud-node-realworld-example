export function envGet<T>(env: T, varname: keyof T): string | undefined {
  const value = env[varname];
  if (value === undefined || value === null) {
    return undefined;
  }
  return String(value);
}

export function envGetRequired<T>(env: T, varname: keyof T): string {
  const value = env[varname];
  if (value === undefined || value === null) {
    throw new Error(`Missing environment variable [${String(varname)}]`);
  }
  return String(value);
}
