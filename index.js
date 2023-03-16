/* eslint-disable */

import Book from './modules/showFun.js';
import { DateTime } from './modules/luxon.js';

const btn = document.getElementById('add-book');
const title = document.getElementById('title');
const author = document.getElementById('author');
const formBook = document.getElementById('form');
const error = document.getElementById('show-error');
const displayBookList = document.getElementById('table');
const showCurrTime = document.querySelector('.current-time');

const listUp = document.getElementById('list');
const newBook = document.getElementById('bookadd');
const contactUp = document.getElementById('contact');

const listLink = document.getElementById('listlink');
const addNewLink = document.getElementById('addlink');
const contactLink = document.getElementById('contactlink');

const books = new Book();
let bookArray = books.getBook();

const displayBooks = () => {
  displayBookList.innerHTML = '';
  bookArray.forEach((book) => displayBookList.insertAdjacentHTML(
    'beforeend',
    `<tr>
        <td>${book.title} by ${book.author}</td>
        <td><button class="remove" id=${book.id}>Remove</button></td>
      </tr>`,
  ));
};

const hideItems = () => {
  listUp.style.display = 'none';
  newBook.style.display = 'none';
  contactUp.style.display = 'none';
};

const comeUp = () => {
  hideItems();
  listUp.style.display = 'block';
  displayBooks();
};

comeUp();

btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (title.value.length === '' || author.value.length === '') {
    error.innerText = 'All fields should be filled appropriate';
  }
  const bookCheck = bookArray.find(
    (book) => book.title === title.value,
  );
  const authorCheck = bookArray.find(
    (book) => book.author === author.value,
  );
  if (bookCheck && authorCheck) {
    error.innerText = 'This book is already enlisted';
  } else {
    error.innerHTML = '';
    books.bookAdd(author.value, title.value);
    bookArray = books.getBook();
    hideItems();
    listUp.style.display = 'block';
    displayBooks();
  }
  formBook.reset();
});

document.addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.remove');
  if (deleteBtn) {
    books.bookRemove(deleteBtn.id);
    bookArray = books.getBook();
    displayBooks();
  }
});

listLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideItems();
  listUp.style.display = 'block';
});

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideItems();
  contactUp.style.display = 'block';
});

addNewLink.addEventListener('click', (e) => {
  e.preventDefault();
  hideItems();
  newBook.style.display = 'block';
});

const showDateTime = () => {
    const time = DateTime.now();
    const dayTime = time.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  
    showCurrTime.textContent = dayTime;
  };
  setInterval(showDateTime, 2000);


