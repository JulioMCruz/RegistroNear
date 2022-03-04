import { PersistentMap } from "near-sdk-as";

import { Course } from "./course";

@nearBindgen
export class User {
  accountId: string;
  email: string;
  acquisitions: Course[];
  name: string;
  postedBooks: Course[];

  constructor(
    accountId: string,
    email: string,
    acquisitions: Course[],
    name: string,
    postedCourses: Course[]
  ) {
    this.accountId = accountId;
    this.email = email;
    this.acquisitions = acquisitions;
    this.name = name;
    this.postedCourses = postedCourses;
  }
}

export const users = new PersistentMap<String, User>("users");
