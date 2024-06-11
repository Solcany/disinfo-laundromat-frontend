import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function getPathRoot(path: string): string {
  const segments = path.split('/');
  const root = segments[1];
  return '/' + root;
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
export function getElementYOffset(element: HTMLElement): number {
  const elementRect = element.getBoundingClientRect();
  const pageYOffset = window.pageYOffset || document.documentElement.scrollTop;
  return pageYOffset + elementRect.top;
}

export function scrollToElementYCenter(element: HTMLElement, duration: number): void {
  const startingY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
  const elementY = getElementYOffset(element);
  const windowHeight = window.innerHeight;

  // Adjust targetY to position the element at the center of the viewport
  let targetY = elementY - windowHeight / 2;
  const bodyScrollHeight = document.body.scrollHeight;

  // Ensure targetY doesn't scroll past the top or bottom of the document
  if (targetY < 0) {
    targetY = 0; // Ensure it doesn't scroll above the top
  } else if (targetY + windowHeight > bodyScrollHeight) {
    targetY = bodyScrollHeight - windowHeight; // Ensure it doesn't scroll past the bottom
  }

  const diff = targetY - startingY;

  const easing = (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  if (diff === 0) {
    return;
  }

  let start: number;

  function step(timestamp: number): void {
    if (start === undefined) {
      start = timestamp;
    }

    const elapsed = timestamp - start;
    const percent = Math.min(elapsed / duration, 1);
    const easedPercent = easing(percent);

    window.scrollTo(0, startingY + diff * easedPercent);

    if (elapsed < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
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

export function consolidateEnginesFormEntries(formData: FormData): FormData {
  const entriesToCheck = [
    'bing',
    'bing_news',
    'copyscape',
    'gdelt',
    'google',
    'google_news',
    'yandex',
    'yahoo'
  ];

  let engines = [];

  // Check and process specified entries in formData
  for (const entry of entriesToCheck) {
    if (formData.has(entry)) {
      engines.push(entry); // Add to engines array
      formData.delete(entry); // Remove from formData
    }
  }

  engines.forEach((item) => {
    formData.append('search_engines', item);
  });

  return formData;
}

export function objectToFormData(
  object: Record<string, number | number[] | string | string[] | boolean | boolean[]>
): FormData {
  let formData = new FormData();
  Object.entries(object).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  return formData;
}
