import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines the ```clsx``` and ```twMerge``` utilities.
 * @param classes The classes you want to merge.
 */
export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));
