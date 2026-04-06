import { Book } from "./Book.js";
import { ReferenceBook } from "./ReferenceBook.js";
export class Library {
  constructor(private books: (Book | ReferenceBook)[] = []) {}
  addBook(book: Book | ReferenceBook): string {
    console.log(book instanceof ReferenceBook)
    this.books = [...this.books, book];
    localStorage.setItem('books',JSON.stringify(this.books))
    return "Book was added successfully";
  }
  removeBook(bookId: string) {
  const books= this.books.filter((book) => {
      const storedBookId = book.getBookId();
      return storedBookId !== bookId;
    });
    localStorage.setItem('books',JSON.stringify(books))
   return this.books=books;

  }
  searchBooksByTitle(title?: string) {
    if(!title) return this.books;
    return this.books.filter((book) => {
      return book.getTitle()===title;
    });
  }
  searchBooksByAuthor(author?: string) {
     if(!author) return this.books;
    return this.books.filter((book) => {
     
      return book.getAuthor()===author;
    });
  }
  filterByCategory(category: string) {
     if(category ==='default') return this.getBooks();
    return this.books.filter((book) => {
      const storedBookCategory = book.getCategory();
 
      return storedBookCategory.toLocaleLowerCase() === category.toLocaleLowerCase();
    });
  }
  toggleAvailability(bookId: string) {
    const books = this.books.map((book) => {
      const storedBookId = book.getBookId();
      if (storedBookId === bookId) {
        book.toggleIsAvailable();
      }
      return book;
    });
localStorage.setItem("books",JSON.stringify(books))
    return books;
  }
  getBooks() {
    return this.books;
  }
}
