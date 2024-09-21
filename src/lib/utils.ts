import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateString(date: string) {
  return dayjs(date).format("MMM D, h:mm A");
}

export function shortenLongStrings(str: string, length = 3) {
  if (str.length <= length) return str;

  return `${str.slice(0, length)}...`;
}
