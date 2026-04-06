export interface IBook{
  bookId: string
title: string
author: string
category: string
isAvailable: boolean
type:'book'
}
export class Book {
  public type='book';
  constructor(
    private bookId: string,
    private title: string,
    private author: string,
    private category: string,
    private isAvailable: boolean,
  ) {}
  displayInfo(): void {
    console.log(
      `this book has an Id of ${this.bookId},
      with a title of ${this.title},it was created by the ${this.author},
      and under the category of ${this.category},
       ${this.isAvailable ? "it is available" : "it is not available right now "}`,
    );
  }
  getTitle(){
    return this.title;
  }
  getBookId(){
    return this.bookId;
  }
  setTitle(title:string){
     this.title=title;
  }
  getAuthor(){
    return this.author;
  }
  setAuthor(author:string){
     this.author=author;
  }
  getCategory(){
    return this.category;
  }
  setCategory(category:string){
     this.category=category;
  }
  getIsAvailable(){
    return this.isAvailable;
  }
  toggleIsAvailable(){
     this.isAvailable=!this.isAvailable;
  }
}
