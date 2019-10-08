export const Localization: {
  formatDateTime: (date: any, format: string) => string;
  formatCurrency: (currency: any, format: string) => string;
  formatMoney: (currency: any) => string;
  stringUpperCase: (value: string) => string;
  stringLowerCase: (value: string) => string;
  getDateTimeFormat: (format: string) => string;
};

export function getLocalization(): any;

export { Language } from './language';
