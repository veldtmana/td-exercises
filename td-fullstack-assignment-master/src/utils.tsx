import { detectSums } from './utils/mathUtils';
import { isValid } from './utils/validationUtils';

export function calculateResult(parsedArray: number[]): { result: any[] | null; error: string | null } {
  let error: string | null = null;
  let result: any[] | null = null;
  try {
    result = detectSums(parsedArray);
  } catch (e) {
    error = (e as Error).message;
  }
  return { result, error };
}

export { isValid };
