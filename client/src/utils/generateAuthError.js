export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Email or Password is not valid'

    case 'EMAIL_EXISTS':
      return 'Email is already exists'

    case 'EMAIL_NOT_FOUND':
      return "Email doesn't exist"

    default:
      return 'Some error'
  }
}
