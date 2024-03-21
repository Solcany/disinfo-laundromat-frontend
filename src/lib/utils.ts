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

export function getPathRoot(path: string): string {
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

export function domainToUrl(domain: string) {
  if (!domain.startsWith('http://') && !domain.startsWith('https://')) {
    domain = 'https://' + domain;
  }
  try {
    const url = new URL(domain);
    return url.href;
  } catch (error) {
    console.error('Invalid domain:', error);
    return null;
  }
}

import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

type FlyAndScaleParams = {
  y?: number;
  start?: number;
  duration?: number;
};

const defaultFlyAndScaleParams = { y: -4, start: 0.98, duration: 150 };

export const flyAndScale = (node: Element, params?: FlyAndScaleParams): TransitionConfig => {
  const style = getComputedStyle(node);
  const transform = style.transform === 'none' ? '' : style.transform;
  const withDefaults = { ...defaultFlyAndScaleParams, ...params };

  const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
    const [minA, maxA] = scaleA;
    const [minB, maxB] = scaleB;

    const percentage = (valueA - minA) / (maxA - minA);
    const valueB = percentage * (maxB - minB) + minB;

    return valueB;
  };

  const styleToString = (style: Record<string, number | string | undefined>): string => {
    return Object.keys(style).reduce((str, key) => {
      if (style[key] === undefined) return str;
      return str + `${key}:${style[key]};`;
    }, '');
  };

  return {
    duration: withDefaults.duration ?? 200,
    delay: 0,
    css: (t) => {
      const y = scaleConversion(t, [0, 1], [withDefaults.y, 0]);
      const scale = scaleConversion(t, [0, 1], [withDefaults.start, 1]);

      return styleToString({
        transform: `${transform} translate3d(0, ${y}px, 0) scale(${scale})`,
        opacity: t
      });
    },
    easing: cubicOut
  };
};
