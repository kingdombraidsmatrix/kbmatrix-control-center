export interface Country {
  id: number;
  name: string;
  code: string;
  longitude: number;
  latitude: number;
  continent: string;
  callingCode: string;
  currency: Currency;
  allowNewSignup: boolean;
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}
