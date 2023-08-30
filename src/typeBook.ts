export type Book = {
  id: string;
  title: string;
  author: string;
  country: string;
  genre: string[];
  status: string;
  image?: string;
  chapters: number;
  featured: boolean;
  whatsNew: boolean;
  type: string;
  rating: number;
  view?: number;
  imageBig?: string;
  decriptions: string;
  detailChapter: string[];
};

export type DetailChapter = {
  images: Images[];
  chapterId: string;
  chapter: string;
  date: string;
  view: string;
};

export type Images = {
  id: number;
  url: string;
  caption: string;
};
