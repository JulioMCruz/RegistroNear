/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging, storage, PersistentMap } from 'near-sdk-as'
import { User, users } from "../models/user";
import { Course, courses } from "../models/course";

const DEFAULT_MESSAGE = 'Bienvenido'
const recipientList = new PersistentMap<string,string[]>('RL');
const totalSent = new PersistentMap<string,i32[]>('TS');

export function getGreeting(accountId: string): string | null {
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting(message: string): void {
  const accountId = Context.sender
  // Use logging.log to record logs permanently to the blockchain!
  logging.log(`Saving greeting "${message}" for account "${accountId}"`)
  storage.set(accountId, message)
}

export function registerUser(email: string, name: string): string {
  const newUser = new User(Context.sender, email, [], name, []);
  users.set(Context.sender, newUser);

  return "User registered!";
}

export function addFunds(recipient:string, amount:i32):void{
    if(recipientList.contains(Context.sender)){
        let getList=recipientList.getSome(Context.sender)
        let getTotals=totalSent.getSome(Context.sender)

        logging.log('User exists within list updating lists')

        if(getList.includes(recipient)){
            let getIndex=getList.indexOf(recipient)
            let oldTotal=getTotals[getIndex]
            let newTotal=oldTotal+amount
            getTotals[getIndex]=newTotal
            totalSent.set(Context.sender,getTotals)
        }else{
            getList.push(recipient);
            recipientList.set(Context.sender,getList)
            getTotals.push(amount)
            totalSent.set(Context.sender,getTotals)
        }
    }
    else{
        logging.log('User does not exists within storage adding new user')
        recipientList.set(Context.sender,[recipient])
        totalSent.set(Context.sender,[amount])
    }
}

export function getNames(User:string):string[]{
    if(recipientList.contains(User)){
        return recipientList.getSome(User)
    }else{
        return[]
    }
}
export function getValues(User:string):i32[]{
    if(totalSent.contains(User)){
        return totalSent.getSome(User)
    }else{
        return[]
    }
}

export function postCourse(
  title: string,
  price: string,
  description: string,
  content: string
): string {
  const author = Context.sender;
  const newCourse = new Course(title, author, price, description, content);
  const user = users.get(author);

  if (user) {
    courses.set(title, newCourse);

    user.postedCourses.push(newCourse);
    users.set(author, user);
    return `${title} has been registered! by  ${author}`;
  } else {
    return "The user is not registered";
  }
}

export function getCourse(title: string): Course {
  const course = courses.get(title);
  if (course) {
    return course;
  }

  return new Course("", "", "", "", "");
}

export function getCourses(): PersistentMap<String, Course> {
  return courses;
}

export function buyCourse(title: string): string {
  const attachedDeposit = Context.attachedDeposit.as<u128>();
  const sender = Context.sender;
  const course = courses.get(title);
  if (course) {
    const user = users.get(sender);
    if (user) {
      if (attachedDeposit >= u128.from(course.price)) {
        user.acquisitions.push(course);
        users.set(sender, user);
        return "Learn with your new course: " + title;
      }
      return (
        "The price of the course is higher: " +
        ` you inserted ${attachedDeposit} NEAR`
      );
    }

    return "User: '" + sender + "' is not registered";
  }

  return "No course: '" + title + "' found";
}

export function getUserData(accountId: string): User {
  const user = users.getSome(accountId);

  if (user) {
    return user;
  }
  return new User("", "", [], "", []);
}
