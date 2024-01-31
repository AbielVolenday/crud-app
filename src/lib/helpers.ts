// Convert Date to DD/MM/YYYY
export function formatDate (date: string): string {
  return date.split('T')[0].split('-').reverse().join('/')
}
