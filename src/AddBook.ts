import { Book, IBook } from "./Book.js";
import { Library } from "./Library.js";
import { IReferenceBook, ReferenceBook } from "./ReferenceBook.js";
export function isReferenceBook(book: IBook | IReferenceBook): book is IReferenceBook {
  return "locationCode" in book;
}
//--------------------------------------------------------//
const memoisedBooks = JSON.parse(
  localStorage.getItem("books") as string,
) as (IBook | IReferenceBook)[];

const books = memoisedBooks.map(
  (book) =>
   {
      if (isReferenceBook(book)) {
    return new ReferenceBook(book.locationCode ,book.bookId,book.title,book.author,book.category,book.isAvailable);
  }
else{

  return new Book(
    book.bookId,
    book.title,
    book.author,
    book.category,
    book.isAvailable
  );
}

   }
);
const library = new Library(books);
const AddBookTitle = document.querySelector(
  "input.add-title",
)! as HTMLInputElement;
const AddBookAuthor = document.querySelector(
  "input.add-author",
)! as HTMLInputElement;
const AddBookCategory = document.querySelector(
  "input.add-category",
)! as HTMLInputElement;
const AddBookAvailability = document.querySelector(
  "input.add-availability",
)! as HTMLInputElement;
const addBookForm = document.querySelector(
  "form.add-book-form",
)! as HTMLFormElement;
const addReferenceBookCheckBox = document.querySelector(
  "input.add-referenceBook",
)! as HTMLInputElement;

const addReferenceBookInput = ` <div id="referenceInputWrapper" style="display: flex; gap: 2rem; justify-content: space-between">
  <label for="reference"> Location Code: </label>
  <input type="text" class="add-locationCode" placeholder="LocationCode" id="locationCode" />
</div>`;
addReferenceBookCheckBox.addEventListener("change", () => {
  if (addReferenceBookCheckBox.checked) {
    const parentDiv = AddBookCategory.parentElement;
    parentDiv?.insertAdjacentHTML("afterend", addReferenceBookInput);
  } else {
    document.querySelector("#referenceInputWrapper")?.remove();
  }
});

addBookForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  if (
    !AddBookTitle ||
    !AddBookAuthor ||
    !AddBookCategory ||
    !AddBookAvailability
  )
    return null;
  if (addReferenceBookCheckBox.checked) {
    const input=document.querySelector(".add-reference")! as HTMLInputElement
    const newBook = new ReferenceBook(
      input.value,
      crypto.randomUUID(),
      AddBookTitle.value,
      AddBookAuthor.value,
      AddBookCategory.value,
      AddBookAvailability.checked,
    );
   return library.addBook(newBook);
    
  }
  else{

    const newBook = new Book(
      crypto.randomUUID(),
      AddBookTitle.value,
      AddBookAuthor.value,
      AddBookCategory.value,
      AddBookAvailability.checked,
    );
    library.addBook(newBook);
    return;
  }
});
