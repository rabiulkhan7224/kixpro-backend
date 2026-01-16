
export function generateUniqueSKU(
  productTitle: string,
  options: Record<string, string>
): string {
  const productCode = productTitle
    .substring(0, 3)
    .toUpperCase()
    .replace(/[^A-Z]/g, 'X');
  
  const optionCodes = Object.values(options)
    .map(val => val.substring(0, 2).toUpperCase().padEnd(2, 'X'))
    .join('');
  
  const timestamp = Date.now().toString().slice(-4);
  
  return `${productCode}-${optionCodes}-${timestamp}`;
}