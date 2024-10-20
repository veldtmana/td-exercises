import { detectSums } from './utils/mathUtils';

export function calculateResult(input: string): { input: number[]; result: number[] | null; error: string | null } {
  const parsedInput = input.split(',').map(i => parseInt(i.trim(), 10));
  let error: string | null = null;
  let result: number[] | null = null;
  try {
    result = detectSums(parsedInput);
  } catch (e) {
    error = (e as Error).message;
  }
  return { input: parsedInput, result, error };
}
