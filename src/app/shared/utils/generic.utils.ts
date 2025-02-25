export const arrayFromNumber = (number: number): number[] =>
    Array.from({ length: number }, (_, i) => i + 1);