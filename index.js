import Book from './modules/book.js';
import { DateTime } from './modules/luxon.js';

const btn = document.getElementById('add-book');
const title = document.getElementById('title');
const author = document.getElementById('author');
const formBook = document.getElementById('form');
const error = document.getElementById('show-error');
const displayBook = document.getElementById('table');

const listUp = document.getElementById('list');
const newBook = document.getElementById('bookadd');
const contactUp = document.getElementById('contact');

const listLink = document.getElementById('listlink');
const addNewLink = document.getElementById('bookadd');
const contactLink = document.getElementById('contactlink');

// Instantiate book class
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

// add book from form
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
    error.innerText = 'This book already exists!!';
  } else {
    error.innerHTML = '';
    books.bookAd(author.value, bookTitle.value);
    bookArray = books.getBook();
    hideItems();
    listUp.style.display = 'block';
    displayBooks();
  }
  form.reset();
});

// Document listener for removing book
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

/*const time = document.querySelector('.time');
const date = new Date();
time.textContent = `${date.toDateString()}`;

setInterval(() => {
  const date = DateTime.now().toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
  time.textContent = `${date}`;
}, 1000);