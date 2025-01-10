const errorMessages: { [key: number]: string } = {
  400: "Bad credantials!",
  401: "Unathorized!",
  403: "Frobidden!",
  404: "Not found!",
  409: "Conflict",
  500: "Server error",
};

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  status: number,
  message: string = errorMessages[status]
) => {
  const error: CustomError = new Error(message);
  error.status = status;
  return error;
};
