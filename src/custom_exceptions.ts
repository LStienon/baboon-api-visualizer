export class ServerDownException extends Error {
  constructor() {
    super("SERVER_DOWN")
  }
}
export class UnexpectedException extends Error {
  constructor() {
    super("UNEXPECTED_ERROR")
  }
}
export class ForbiddenOperationException extends Error {
  constructor() {
    super("FORBIDDEN_OPERATION")
  }
}
