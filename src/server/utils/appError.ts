export default class AppError extends Error {
  Statuscode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, Statuscode: number) {
    super(message);
    this.Statuscode = Statuscode;
    this.status = `${Statuscode}`.startsWith("4") ? "failure" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
