import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function includeObjectKeys(
  obj: Record<string, any>,
  allowed: string[]
): Record<string, any> {
  const filtered = Object.keys(obj)
    .filter((key) => allowed.includes(key))
    .reduce(
      (newObj, key) => {
        key = key as keyof typeof newObj;
        newObj[key] = obj[key];
        return newObj;
      },
      {} as Record<string, any>
    );
  return filtered;
}

export function excludeObjectKeys(
  obj: Record<string, any>,
  allowed: string[]
): Record<string, any> {
  const filtered = Object.keys(obj)
    .filter((key) => !allowed.includes(key))
    .reduce(
      (newObj, key) => {
        key = key as keyof typeof newObj;
        newObj[key] = obj[key];
        return newObj;
      },
      {} as Record<string, any>
    );
  return filtered;
}


export function getPathRoot(path : string): string {
  const segments = path.split('/');
  const root = segments[1];  
  return '/' + root;
}


export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function zip(...arrays: any[][]): any[][] {
  const length = arrays.length > 0 ? arrays[0].length : 0;

  for (const arr of arrays) {
    if (arr.length !== length) {
      throw new Error('Arrays must have the same length');
    }
  }

  return Array.from({ length }, (_, index) => arrays.map((array) => array[index]));
}
