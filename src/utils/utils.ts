import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const generateChartData = (dummyDays: string[]) => {

  return dummyDays.map((day) => ({
    name: day,
    value: Math.floor(Math.random() * 80) + 20,
  }));
};