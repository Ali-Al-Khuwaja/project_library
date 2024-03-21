'use strict';
let myLibrary = [];

const gridContainer = document.querySelector('.gridContainer');
const bookTitle = document.querySelector('.title');
const bookAuthor = document.querySelector('.author');
const bookPages = document.querySelector('.pages');
const dialog = document.querySelector('dialog');
const addNewBook = document.querySelector('.addNewBook');
const closeDialog = document.querySelector('.closeDialog');
const html = document.querySelector('html');
const checkbox = document.querySelector('.checkbox');

// get all the required data from the inputs and assign them to the template
function BOOK(title,author,pages,id,checkbox) {
  this.title = title ;
  this.author = author ;
  this.pages = pages ;
  this.id = id ;
  this.checkbox = checkbox ;
};

function addBookRequest(){
//store all data from dialog into a new created book object and push it in my library array
  let newBookId = myLibrary.length + 1;
  let book = new BOOK(bookTitle.value ,bookPages.value,bookPages.value,newBookId,checkbox.checked); 
  myLibrary.push(book);
  display();
};

// This function should receive an array item and create HTML based on object content
function createHTML(book){
  if (book.checkbox===true){
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
  </div>`
  }else{
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
  </div>`
  };
  let bookID = book.id ;
  canRemove(bookID);
};
// function canRemove(someID) {
//   let removeButtons = document.querySelectorAll('.remove');
//   SomeID = someID ;
//   removeButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       myLibrary = myLibrary.filter(function (ThisBook,SomeID){
//         console.log(myLibrary.length, myLibrary[SomeID] , This);
//         return ThisBook !== SomeID ;
//       }); 
//       display();
//     });
//   });
// }
function canRemove(bookID){
  let remove = document.querySelector(`.remove${bookID}`);
  remove.addEventListener('click' , ()=>{
    myLibrary = myLibrary.filter(function (book){
      return book.id !== bookID ;
    });
    display();
  });
};

function display(){
  gridContainer.innerHTML = '';
  for (let i=0; myLibrary.length>i;i++){
    createHTML(myLibrary[i]); 
  };
};

//dialog 🖣
addNewBook.addEventListener('click',()=>{
  html.classList.add('modal-is-opening');
  dialog.showModal();
});
closeDialog.addEventListener('click',()=>{
  dialog.close();
});
const addBookDialog = document.querySelector('.addBookDialog');
addBookDialog.addEventListener('click',()=>{
  dialog.close();
  addBookRequest();
});