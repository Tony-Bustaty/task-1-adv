import { isReferenceBook } from "./AddBook.js";
import { Book, IBook } from "./Book.js";
import { Library } from "./Library.js";
import { ReferenceBook } from "./ReferenceBook.js";

function displayBooks(libraryBooks: Book[]) {
  if (libraryBooks.length === 0) {
    console.log("hold up");
    const button = `<div style="display:flex; width:100%; justify-content:center;align-items:center;">
    <button '><a href="/AddBook.html">Add your first book</a></button>
    </div>`;
    return (main.innerHTML = button);
  } else {
    main.innerHTML = "";
    return libraryBooks.map((book) => {
      const title = book.getTitle();
      const author = book.getAuthor();
      const category = book.getCategory();
      const isAvailable = book.getIsAvailable();
      const toggleButton = ` <button class='toggleAvailability' style="border:0; background-color:aqua; padding:1rem; border-radius:1rem; cursor:pointer">Toggle Availability</button>`;
      const deleteButton = ` <button class='removeBook' style="border:0; background-color:red; color:white; padding:1rem; border-radius:1rem;  cursor:pointer">Delete</button>`;
      const ShowMore = `<button class='showMore' style="border:0; background-color:#222; color:white; padding:1rem; border-radius:1rem;  cursor:pointer">show More</button>`;
      const card = ` 
     <section class="card"  data-id="${book.getBookId()}" style="max-width:20rem;background-color: aquamarine; padding:5rem; line-height: 1.5;">
     <p id="title" style="margin:1rem 0;">Title: ${title}</p>
             <p id="author" style="margin:1rem 0;">Author: ${author}</p>
             <p id="category" style="margin:1rem 0;">Category: ${category}</p>
             <p id="availability" style="margin:1rem 0;">Availability: ${isAvailable}</p>
             <div style="display:flex; gap:1rem;">${toggleButton} ${deleteButton}</div>
            ${book instanceof ReferenceBook ? ShowMore : ""}

        </section> 
     `;
      main.insertAdjacentHTML("beforeend", card);
    });
  }
}

const memoisedBooks = JSON.parse(
  localStorage.getItem("books") as string,
) as IBook[];

const books = memoisedBooks.map((book) => {
  if (isReferenceBook(book)) {
    return new ReferenceBook(
      book.locationCode,
      book.bookId,
      book.title,
      book.author,
      book.category,
      book.isAvailable,
    );
  } else {
    return new Book(
      book.bookId,
      book.title,
      book.author,
      book.category,
      book.isAvailable,
    );
  }
});
const library = new Library(books);
const main = document.querySelector("section.main")!;
const input = document.getElementById("searchInput")! as HTMLInputElement;
const selectOptions = document.querySelector(
  ".categoryFilter",
) as HTMLSelectElement;

let booksToBeDisplayed = displayBooks(library.getBooks());
input.addEventListener("input", () => {
  const booksFilteredByTitle = library.searchBooksByTitle(input.value);
  const booksFilteredByAuthor = library.searchBooksByAuthor(input.value);
  booksFilteredByTitle.length > 0
    ? (booksToBeDisplayed = displayBooks(booksFilteredByTitle))
    : booksFilteredByAuthor.length > 0
      ? (booksToBeDisplayed = displayBooks(booksFilteredByAuthor))
      : booksToBeDisplayed;
});
selectOptions.addEventListener("change", () => {
  const booksFilterByCategory = library.filterByCategory(selectOptions.value);
  booksFilterByCategory
    ? (booksToBeDisplayed = displayBooks(booksFilterByCategory))
    : booksToBeDisplayed;
});
main.addEventListener("click", (e) => {
  if (!(e.target instanceof HTMLElement)) return;

  const card = e.target.closest(".card") as HTMLElement | null;
  if (!card) return;

  const id = card.dataset.id!;
  const action = getAction(e.target);

  switch (action) {
    case "toggleAvailability":
      displayBooks(library.toggleAvailability(id));
      break;

    case "removeBook":
      displayBooks(library.removeBook(id));
      break;

    case "showMore":
      handleShowMore(card, id);
      break;
  }
});

function getAction(target: HTMLElement): string | null {
  if (target.matches(".toggleAvailability")) return "toggleAvailability";
  if (target.matches(".removeBook")) return "removeBook";
  if (target.matches(".showMore")) return "showMore";
  return null;
}

function handleShowMore(card: HTMLElement, id: string) {
  const availability = card.querySelector("#availability");
  const book = library.getBooks().find((book) => book.getBookId() === id);

  if (book instanceof ReferenceBook) {
    const existing = card.querySelector("#locationCode");

    if (existing) {
      existing.remove();
      return;
    }

    const html = `
      <p id="locationCode" style="margin:1rem 0;">
        Location Code: ${book.getLocationCode()}
      </p>
    `;
    availability?.insertAdjacentHTML("afterend", html);
  }
}