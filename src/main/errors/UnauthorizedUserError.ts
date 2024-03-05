export class UnauthorizedUserError extends Error {
  constructor() {
    super('User Not Authorized To Perform The Operation');
    this.name = 'UnauthorizedUserError';
  }
}
