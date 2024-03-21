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
  let newBookTitle = bookTitle.value;
  let newBookAuthor = bookPages.value;
  let newBookPages = bookPages.value;
  let newBookId = myLibrary.length + 1;
  let newBookCheckbox = checkbox.value ;
  let book = new BOOK(newBookTitle,newBookAuthor,newBookPages,newBookId,newBookCheckbox); 
  myLibrary.push(book);
  console.log(`myLibrary now has a new item in it and it's called ${console.log(myLibrary[0])} and ${book}`);
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
      <button class="remove">remove</button>
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
      <button class="remove">remove</button>
    </article>
  </div>`
  };
};
// don't touch , it's working
function display(){
  gridContainer.innerHTML = '';
  for (let i=0; myLibrary.length>i;i++){
    console.log(`hi i am ${myLibrary[i]}`);
    createHTML(myLibrary[i]); 
  };
};
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