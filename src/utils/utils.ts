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

export const calculateDuration = (startDate: string, startTime: string, endDate: string, endTime: string) => {
  if (!startDate || !startTime || !endDate || !endTime) return '';

  try {
    const [startDay, startMonth, startYear] = startDate.split('.');
    const [endDay, endMonth, endYear] = endDate.split('.');

    const start = new Date(`${startYear}-${startMonth}-${startDay}T${startTime}`);
    const end = new Date(`${endYear}-${endMonth}-${endDay}T${endTime}`);

    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${diffDays} days and ${diffHours} hours`;
  } catch {
    return '';
  }
};