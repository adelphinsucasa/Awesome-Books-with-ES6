export default class BookCollection {
  constructor() {
    this.books = [];
  }

  addBook = (cTitle, cAuthor) => {
    const newBook = {
      title: cTitle,
      author: cAuthor,
    };
    this.books.push(newBook);
    localStorage.setItem('localStorageBooks', JSON.stringify(this.books));
  }

  removeBook = (index) => {
    const result = this.books.filter((book, i) => i !== index);
    this.books = result;
    localStorage.setItem('localStorageBooks', JSON.stringify(this.books));
    window.location.reload();
  }

  getBooks = () => this.books

  setBooks = (books) => {
    this.books = books;
  }
}
