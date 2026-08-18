import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const enumToOptions = <T extends Record<string, string | number>>(enumObj: T) =>
  Object.entries(enumObj)
    .filter(([key]) => isNaN(Number(key))) // numeric reverse mapping বাদ
    .map(([key, value]) => ({
      label: key.replace(/_/g, " "),
      value,
    }));

export const hasAnyPermission = (
  userPermissions: { name: string }[] | null | undefined,
  requiredPermissions: string[]
): boolean => {
  return (
    userPermissions?.some(permission =>
      requiredPermissions.includes(permission.name)
    ) ?? false
  );
};