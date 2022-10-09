const STORAGE_KEY = 'booksDB'
const VIEW_KEY = 'USERPREF'
const PAGE_SIZE = 4
const bookNames = [
  'The Gruffalo',
  'Finn Family Moomintroll',
  'The Cat in the Hat',
  'Something Else',
  'Winnie-the-Pooh',
  'The Giving Tree',
  'Emil and the Detectives',
  'The Adventures of Captain Underpants',
]

var gViewType
var gCurrBookId
var gPageIdx = 0
var gBooks
var gFilterBy = { txt: '', maxPrice: 31, minRate: 0 }
var isDesc = true

_createBooks()

function loadUserPref() {
  var userPref = loadFromStorage(VIEW_KEY)
  gViewType = userPref
}

function getBooks() {
  var books = gBooks

  books = gBooks.filter((book) =>
    book.name.toLowerCase().includes(gFilterBy.txt.toLowerCase())
  )

  books = books.filter(
    (book) => book.price < gFilterBy.maxPrice && book.rate >= gFilterBy.minRate
  )
  const startIdx = gPageIdx * PAGE_SIZE
  books = books.slice(startIdx, startIdx + PAGE_SIZE)
  return books
}

function removeBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => bookId === book.id)
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage()
}

function addBook(bookName, bookPrice, imgURL) {
  const book = _createBook(bookName, bookPrice, imgURL)
  gBooks.unshift(book)
  _saveBooksToStorage()
  return book
}

function _createBook(name, price, img) {
  return {
    id: makeId(),
    name,
    price: price || getRandomIntInclusive(12, 30),
    rate: 0,
    imgUrl: img || `/img/${name}.jpg`,
  }
}

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY)
  // Nothing in storage - generate demo data
  if (!books || !books.length) {
    books = []
    for (let i = 0; i < bookNames.length; i++) {
      var book = bookNames[i]
      books.push(_createBook(book))
    }
  }
  gBooks = books
  _saveBooksToStorage()
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks)
}

function updateBook(bookId, newPrice, imgURL = '') {
  const book = getBookById(bookId)
  book.price = newPrice
  return book
}

function getBookById(bookId) {
  const book = gBooks.find((book) => bookId === book.id)
  return book
}

function bookRate(val) {
  var book = getBookById(gCurrBookId)
  if (val === 'plus' && book.rate < 10) {
    book.rate++
    return book
  }
  if (val === 'minus' && book.rate > 0) {
    book.rate--
    return book
  }
}

function setBookFilter(filterBy) {
  if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
  if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
  if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
  return gFilterBy
}

function setBookSort(sortBy) {
  // better have a global variable to hold the sortby value
  if (sortBy.price !== undefined) {
    gBooks.sort((c1, c2) => (c1.price - c2.price) * sortBy.price)
  } else if (sortBy.name !== undefined) {
    gBooks.sort((c1, c2) => c1.name.localeCompare(c2.name) * sortBy.name)
  }
}

function nextPage() {
  gPageIdx++
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0
  }
}

function setView(viewType) {
  gViewType = viewType
  saveToStorage(VIEW_KEY, gViewType)
}

function setActionsForm() {}
