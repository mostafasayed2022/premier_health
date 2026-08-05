export interface FaqItem {
  q: string;
  q_ar: string;
  a: string;
  a_ar: string;
}

export interface ServiceData {
  photo: any;
  id: string | number;
  name: string;
  name_ar: string;
  slug: string;
  category: string;
  description: string;
  description_ar: string;
  ingredients?: string;
  ingredients_ar?: string;
  price: number;
  benefits: string[];
  benefits_ar: string[];
  process: string[];
  process_ar: string[];
  faq: FaqItem[];
}
