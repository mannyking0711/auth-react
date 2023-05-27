export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString()
}

