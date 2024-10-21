import * as Joi from 'joi';
import { ValidationError } from 'joi';

const arrayOfNumbersSchema = Joi.array().items(Joi.number()).min(3);

interface ValidationResult {
  valid: boolean;
  error: string | null;
  parsed: number[] | null;
}

function formatValidationErrors(errors: ValidationError): string {
  return errors.details.map(obj => {
    return obj.message
      .replace(/".+"/, '');
  }).join(', ');
}

export const isValid = (input: string): ValidationResult => {
  const parsedInput = input.split(',').map(i => parseInt(i.trim(), 10));

  const { error } = arrayOfNumbersSchema.validate(parsedInput);
  return {
    valid: !error,
    error: error 
      ? formatValidationErrors(error)
      : null,
    parsed: error 
      ? null 
      : parsedInput,
  };
};
