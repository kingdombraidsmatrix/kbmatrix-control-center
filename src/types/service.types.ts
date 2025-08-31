import type { Media } from '@/types/stylist.types.ts';

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
