import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toRupiah = (amount: number): string => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return formatter.format(amount);
};

export const convertDate = (createAt: string) => {
  const d = new Date(createAt);

  const month = d.getMonth();
  const date = d.getDate();

  const year = d.getFullYear();

  return `${month}-${date}-${year}`;
};
