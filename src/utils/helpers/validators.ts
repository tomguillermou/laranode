/**
 * This helper check validation and throw an error with the given message if validation failed
 * @param validation Boolean that is the result of the validation test
 * @param message Error message to throw if validation fails
 */
export function check(validation: boolean, errorMessage: string) {
  if (!validation) {
    throw new Error(errorMessage);
  }
}
