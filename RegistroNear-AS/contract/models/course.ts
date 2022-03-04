import { PersistentMap, u128 } from "near-sdk-as";

@nearBindgen
export class Course {
  title: string;
  author: string;
  price: string;
  description: string;
  content: string;

  constructor(
    title: string,
    author: string,
    price: string,
    synopsis: string,
    content: string
  ) {
    this.author = author;
    this.content = content;
    this.price = price;
    this.description = synopsis;
    this.title = title;
  }
}

export const courses = new PersistentMap<string, Course>("books");
