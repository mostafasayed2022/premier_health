export interface FaqQuestionItem {
  q: string;
  a: string;
}

export interface FaqSectionData {
  category: string;
  items: FaqQuestionItem[];
}
