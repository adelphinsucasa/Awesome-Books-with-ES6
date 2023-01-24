import BookCollection from './bookCollection.js';
import { DateTime } from './luxon.js';

const addElementsToDom = () => {
  const div = document.querySelector('#bookListContainer');
  const ul = document.querySelector('#ulBookList');
  const addForm = document.getElementById('addBookForm');

  const newBooksCollection = new BookCollection();

  window.addEventListener('load', () => {
    if (JSON.parse(localStorage.getItem('localStorageBooks')) === null) {
      localStorage.setItem('localStorageBooks', JSON.stringify(newBooksCollection.getBooks()));
    } else {
      newBooksCollection.setBooks(JSON.parse(localStorage.getItem('localStorageBooks')));
    }

    // NAVBAR ELEMENTS
    const listBookLink = document.querySelector('#listBook');
    const addNewLink = document.querySelector('#addBook');
    const contactLink = document.querySelector('#contact');

    const bookListSection = document.querySelector('section.bookList');
    const addNewSection = document.querySelector('section.addBook');
    const contactSection = document.querySelector('section.contact');

    const hideShow = (showElem, hideElem1, hideElem2) => {
      showElem.classList.remove('invisible');
      showElem.classList.add('visible');

      hideElem1.classList.remove('visible');
      hideElem1.classList.add('invisible');

      hideElem2.classList.remove('visible');
      hideElem2.classList.add('invisible');
    };

    listBookLink.addEventListener('click', () => {
      hideShow(bookListSection, addNewSection, contactSection);
    });

    addNewLink.addEventListener('click', () => {
      hideShow(addNewSection, bookListSection, contactSection);
    });

    contactLink.addEventListener('click', () => {
      hideShow(contactSection, addNewSection, bookListSection);
    });

    // LIST BOOK ELEMENTS
    let aux = '';
    for (let i = 0; i < newBooksCollection.getBooks().length; i += 1) {
      aux += `<li class='bookList'>
                        <p>"${newBooksCollection.getBooks()[i].title}" by ${newBooksCollection.getBooks()[i].author}</p>
                        <button class="btnRemove" id="btnRemove${i} type="button">Remove</button>
                    </li>`;
    }
    ul.innerHTML = aux;
    div.appendChild(ul);

    document.querySelectorAll('.btnRemove').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        newBooksCollection.removeBook(index);
      });
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                               Event Listeners                              */
  /* -------------------------------------------------------------------------- */

  addForm.addEventListener('submit', () => {
    newBooksCollection.addBook(addForm.title.value, addForm.author.value);
  });

  // DATE
  function getDate() {
    const dateField = document.querySelector('#date');
    const actualDate = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
    dateField.textContent = actualDate;
  }

  setInterval(() => {
    getDate();
  }, 1000);
};

export default addElementsToDom;