export function canEditDataHelperFn(role: string) {
  return role === "admin" || role === "dataEntry";
}
