/* eslint-disable */

export default class Book {
  constructor() {
    this.bookUl = JSON.parse(localStorage.getItem('storage-book')) || [];
  }

  bookAdd(author, title) {
    const bookUpdated = [
      ...this.bookUl,
      { id: `${Math.random()}${author.split(' ')[0]}`, author, title },
    ];
    this.updateStorage(bookUpdated);
  }

  bookRemove(id) {
    const bookUpdated = this.bookUl.filter((item) => item.id !== id);
    this.updateStorage(bookUpdated);
  }

  
  getBook() {
    return this.bookUl;
  }

  updateStorage(dat) {
    localStorage.setItem('storage-book', JSON.stringify(dat));
    this.bookUl = dat;
  }
}