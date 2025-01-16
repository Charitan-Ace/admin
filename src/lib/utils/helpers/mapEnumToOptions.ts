export function mapEnumToOptions<T>(
  enumObj: T,
): { value: keyof T; label: string }[] {
  return Object.keys(enumObj).map((key) => ({
    value: key as keyof T,
    label: enumObj[key as keyof T] as string,
  }));
}
