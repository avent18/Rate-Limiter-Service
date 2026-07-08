

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.name = this.constructor.name;
  }
}

export default ApiError;
