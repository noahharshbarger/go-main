import { PortableTextBlock } from "sanity";

export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export type Blog = {
  title: string;
  slug: {
    current: string;
    _type: string;
  };
  metadata?: string;
  body?: PortableTextBlock[];
  mainImage?: any;
  author?: Author;
  tags?: string[];
  publishedAt?: string;
};
