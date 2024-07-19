export function capitalize(str: string | undefined) {
  if (typeof str !== 'string') return undefined
  return str.charAt(0).toUpperCase() + str.slice(1)
}
