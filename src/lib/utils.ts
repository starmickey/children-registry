import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthDate: Date) {
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  // Get the difference in months
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // If they haven't had their birthday yet this year, subtract 1
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

