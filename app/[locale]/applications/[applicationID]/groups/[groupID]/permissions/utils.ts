export function parsePermission(permission: number): [number, number, number] {
  const binary = permission.toString(2).padStart(3, '0')
  return binary.split('').reverse().map(Number) as [number, number, number]
}
