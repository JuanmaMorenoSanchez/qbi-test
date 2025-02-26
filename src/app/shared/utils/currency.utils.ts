export function formatCurrency(value: number | string, currency: 'EUR' | 'USD' = 'EUR'): string {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    return 'Invalid value';
  }

  switch (currency) {
    case 'EUR':
      return `${numericValue.toFixed(2)} €`;
    case 'USD':
      return `$ ${numericValue.toFixed(2)}`;
    default:
      return `${numericValue.toFixed(2)} €`;
  }
}
