'use strict'
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
function addBookRequest(){
  let containTitle ;
  let containAuthor ;
  let containPages ;
  let id;
  containTitle = bookTitle.value;
  containAuthor = bookAuthor.value;
  containPages = bookPages.value;
  // give this book an id so it can be removed from the myLibrary array 
  id = myLibrary.length +1 ;
  createBook(containTitle,containAuthor,containPages ,checkbox.checked , id);
  display();
}

// this will create an object with data as a book without html
function createBook(title,author,pages,checkbox,id){
  let book = {
    title: title ,
    author: author ,
    pages: pages ,
    checkbox: checkbox ,
    id: id ,
  }; // push it to my library to use call for displaying HTML 
  myLibrary.push(book);
}
function display(){
  gridContainer.innerHTML = '';
  for(let i=0;myLibrary.length>i;i++){
    gridContainer.innerHTML += createHTML(myLibrary[i]);
  };
}

function createHTML(book){
  let BookTitle = book.title;
  let bookAuthor = book.author;
  let BookPages = book.pages;
  let BookCheckbox = book.checkbox;
  let BookId = book.id ;
  if (BookCheckbox===true){
    gridContainer.innerHTML += `<div>
    <article>
      <header>
        <h1>${BookTitle}</h1>
      </header>
      <p>by ${bookAuthor}</p>
      <P><mark>${BookPages} pages</marl></P>
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
        <h1>${BookTitle}</h1>
      </header>
      <p>by ${BookAuthor}</p>
      <P><mark>${BookPages} pages</marl></P>
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
  removeAbility(BookId);
};

function removeAbility(book){
  const remove = document.querySelector('.remove');
  // remove.addEventListener('click',removeBook(book.id)); big no no
  remove.addEventListener('click',()=>{
    removeBook(book.id);
  });

}

function removeBook(id){
  const myNewLibraryArray = myLibrary.filter((id)=>{
    for(let i=0;myLibrary.length>=i;i++){
      if(myLibrary[i]===id){
        return myLibrary[i];
      };
    };
  });
  myLibrary = [...myNewLibraryArray] ;
  console.log(myLibrary);
  display();
};

// dialog
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
// end of dialog