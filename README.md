# Book Library Management System

## Installation

To set up the Book Library Management System, follow these steps:

1. Clone the repository:
```
git clone https://github.com/Tony-Bustaty/book-library.git
```
2. Navigate to the project directory:
```
cd book-library
```
3. Install the dependencies:
```
npm install
```

## Usage

1. just use the live server extension which can be install within vs code from the extensions tab

The application provides the following features:

- Add new books to the library
- Search for books by title or author
- Filter books by category
- Toggle book availability
- Remove books from the library

## Methods

The application exposes the following Class methods:

### `addBook(book: Book | ReferenceBook)`
Adds a new book to the library.

### `removeBook(bookId: string)`
Removes a book from the library by its ID.

### `searchBooksByTitle(title?: string)`
Searches for books by their title.

### `searchBooksByAuthor(author?: string)`
Searches for books by their author.

### `filterByCategory(category: string)`
Filters the books by their category.

### `toggleAvailability(bookId: string)`
Toggles the availability of a book.

### `getBooks()`
Returns the list of all books in the library.

