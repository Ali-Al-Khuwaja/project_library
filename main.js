"use strict";

// Book information selectors
const bookTitle = document.querySelector(".title");
const bookAuthor = document.querySelector(".author");
const bookPages = document.querySelector(".pages");
const checkbox = document.querySelector(".checkbox");

// Book object constructor
function Book(title, author, pages, id, checkbox) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = id;
  this.checkbox = checkbox;
}

Book.libraryArray = []; // Static property on the Book constructor (shared across all books)
Book.nextId = 1; // Add a counter to generate unique IDs
Book.prototype.addToLibrary = function () {
  Book.libraryArray.push(this); // This is the calling Object
};

function addBookRequest() {
  // Store all data from dialog into a new created book object and push it in library array
  let newBookId = Book.nextId++;
  let book = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    newBookId,
    checkbox.checked
  );
  book.addToLibrary(book); // I remember ,this function is shared to all instances of Book
  display();
}

// This function should receive an array item and create HTML based on object content
const gridContainer = document.querySelector(".gridContainer");
function createHTML(book) {
  const readStatus = book.checkbox ? "checked" : "";

  // Create elements instead of using innerHTML
  const bookDiv = document.createElement("div");
  bookDiv.innerHTML = `
    <article>
      <header>
        <h1>${book.title}</h1>
      </header>
      <p>by ${book.author}</p>
      <P><mark>${book.pages} pages</mark></P>
      <fieldset class="grid">
        <legend>Read status</legend>
        <label>
          <input type="checkbox" name="newBook" ${readStatus}/>
          I have read this book
        </label>
      </fieldset>
      <button class="remove-btn" data-id="${book.id}">remove</button>
    </article>
  `;
  gridContainer.appendChild(bookDiv);

  /* The arrow function CAPTURES the `book` variable
  At this moment, `book` refers to `book1`
  So this function will ALWAYS remove book with id = 1 */
  const removeBtn = bookDiv.querySelector(".remove-btn");
  // when you add an event listener ,then js will remember it
  removeBtn.addEventListener("click", () => {
    //Remove any book where b.id !== 1 for example
    Book.libraryArray = Book.libraryArray.filter((b) => b.id !== book.id);
    display();
  });
}

function display() {
  gridContainer.innerHTML = "";
  for (let i = 0; Book.libraryArray.length > i; i++) {
    createHTML(Book.libraryArray[i]);
  }
}

// Dialog DOM code 🖣

const dialog = document.querySelector("dialog");
const addNewBook = document.querySelector(".addNewBook");
addNewBook.addEventListener("click", () => {
  const html = document.querySelector("html");
  html.classList.add("modal-is-opening");
  dialog.showModal();
});
const closeDialog = document.querySelector(".closeDialog");
closeDialog.addEventListener("click", () => {
  dialog.close();
});
const addBookDialog = document.querySelector(".addBookDialog");
addBookDialog.addEventListener("click", () => {
  dialog.close();
  addBookRequest();
});
