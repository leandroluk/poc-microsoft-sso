export const makeError = (name: string) => (message?: string) => {
  const error = new Error(message);
  error.name = name;
  return error;
};
