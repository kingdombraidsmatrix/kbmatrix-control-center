import type { DateString, Media } from '@/types/common.types.ts';
import type { Currency } from '@/types/geo.ts';
import type { AverageRating, Stylist } from '@/types/stylist.types.ts';

export interface ServiceCategory {
  id: number;
  name: string;
  description: string;
  image: Media;
  global: boolean;
  createdAt: string;
}

export interface CreateServiceCategory {
  name: string;
  description: string;
}

export interface UpdateServiceCategory extends CreateServiceCategory {
  id?: number;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: Currency;
  image: Media;
  duration: number;
  addon: boolean;
  averageRating: AverageRating;
  stylist: Stylist;
  published: boolean;
  categories: Array<ServiceCategory>;
  createdAt: DateString;
}
