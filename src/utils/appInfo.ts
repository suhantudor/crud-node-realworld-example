export const appInfo = (appName: string, server: string, port: string | number, environment: string): string => {
  const url = `${server}:${port}`;

  return `${appName} App - listening at ${url} on ${environment} environment`;
};
