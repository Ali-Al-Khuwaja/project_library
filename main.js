"use strict";

// Do not forget to define on the prototype (all the methods)

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
Book.prototype.addToLibrary = function () {
  Book.libraryArray.push(this); // This is the calling Object
};

function addBookRequest() {
  // Store all data from dialog into a new created book object and push it in library array
  let newBookId = Book.libraryArray.length + 1;
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
  if (book.checkbox === true) {
    gridContainer.innerHTML += `<div>
    <article>
      <header>
        <h1>${book.title}</h1>
      </header>
      <p>by ${book.author}</p>
      <P><mark>${book.pages} pages</marl></P>
      <fieldset class="grid">
        <legend>Read status</legend>
        <label>
        <input type="checkbox" name="newBook" checked/>
        I have read this book
        </label>
      </fieldset>
      <button class="remove${book.id}">remove</button>
    </article>
  </div>`;
  } else {
    gridContainer.innerHTML += `<div>
    <article>
      <header>
        <h1>${book.title}</h1>
      </header>
      <p>by ${book.author}</p>
      <P><mark>${book.pages} pages</marl></P>
      <fieldset class="grid">
        <legend>Read status</legend>
        <label>
        <input type="checkbox" name="newBook"/>
        I have read this book
        </label>
      </fieldset>
      <button class="remove${book.id}">remove</button>
    </article>
  </div>`;
  }
  let bookID = book.id;
  canRemove(bookID);
}
function canRemove(bookID) {
  let remove = document.querySelector(`.remove${bookID}`);
  remove.addEventListener("click", () => {
    Book.libraryArray = Book.libraryArray.filter(function (book) {
      return book.id !== bookID;
    });
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
