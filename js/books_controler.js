'use strict'

function onInit() {
  renderFilterByQueryStringParams()
  loadUserPref()
  renderBooks()
  doTrans()
}

function renderBooks() {
  gViewType === 'table' ? renderTable() : renderCards()
}

function renderCards() {
  PAGE_SIZE = 5
  var books = getBooks()
  var strHtml = books.map(
    (book) => `
  <article class="book-preview">
      <button title="Remove Book" class="btn-remove" onclick="onRemoveBook('${
        book.id
      }')">X</button>
      <img onerror="this.src='img/no-img.png'" src="${book.imgUrl}" alt="">
      <h5>${book.name}</h5>
      <h6><span data-trans="price">Price </span> <span> ${formatCurrency(
        book.price
      )}</span></h6>
      <section calss="btn-action">
      <button  onclick="onReadBook('${
        book.id
      }')"><span data-trans="details" class="card-btn">Details</span></button>
      <button data-trans="update" class="card-btn" onclick="onUpdateBook('${
        book.id
      }')" >Update</button>
      </section>
  </article>
  `
  )
  document.querySelector('.books-container').innerHTML = strHtml.join('')
  doTrans()
}

function renderTable() {
  PAGE_SIZE = 8
  var books = getBooks()
  var strHtml = books.map(
    (book) => `
  <tr>
  <td>${book.id}</td><td>${book.name}</td><td>${book.price}</td><td class="action-buttons"><button data-trans="details" class="read" 
  onclick="onReadBook('${book.id}')">Read</button>
  <button data-trans="update" class="update" onclick="onUpdateBook('${book.id}')">Update</button>
  <button data-trans="delete" class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
      </td>
</tr> `
  )
  document.querySelector('.books-container').innerHTML =
    `<table>
  <th>Id</th>
  <th title="Sort by name" class="sort-by title" data-trans="book-title" onclick="onSetSortBy('name')">Title</th>
  <th title="Sort by price"class="sort-by price" data-trans="price" onclick="onSetSortBy('price')">Price</th>
  <th class="action-buttons" data-trans="actions">Actions</th>
  <tbody class="books-table">` + strHtml.join('')
  doTrans()
}

function onRemoveBook(bookId) {
  removeBook(bookId)
  renderBooks()
}

function onAddBook() {
  renderAddBookModal()
  document.querySelector('.actions-form').style.display = 'block'
}

function onUpdateBook(bookId) {
  gCurrBookId = bookId
  renderUpdateModal()
  document.querySelector('.actions-form').style.display = 'block'
}

function onReadBook(bookId) {
  var book = getBookById(bookId)
  gCurrBookId = bookId //  add a function to set the global variable value
  var elModal = document.querySelector('.modal')
  elModal.querySelector('h3').innerText = book.name
  elModal.querySelector('h4 span').innerText = book.price
  elModal.querySelector('p').innerText = makeLorem()
  elModal.querySelector('.num').innerText = book.rate
  elModal.querySelector('.modal-img').src = book.imgUrl
  elModal.classList.add('open')
}

function onCloseModal() {
  document.querySelector('.modal').classList.remove('open')
}

function onBookRate(val) {
  // change the val to numerical value and rename
  bookRate(val)
  document.querySelector('.num').innerText = getBookById(gCurrBookId).rate
  renderBooks()
}

function onSetFilterBy(filterBy) {
  filterBy = setBookFilter(filterBy)
  renderBooks()

  const queryStringParams = `?price=${filterBy.maxPrice}&minRate=${filterBy.minRate}&name=${filterBy.txt}`
  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
  const queryStringParams = new URLSearchParams(window.location.search)
  const filterBy = {
    minRate: +queryStringParams.get('minRate') || 0,
    maxPrice: +queryStringParams.get('price') || 31,
    txt: queryStringParams.get('name') || '',
  }

  if (!filterBy.minRate && !filterBy.maxPrice && !filterBy.txt) return

  document.querySelector('.filter-max-price').value = filterBy.maxPrice
  document.querySelector('.filter-min-rate').value = filterBy.minRate
  document.querySelector('.name-search').value = filterBy.txt
  setBookFilter(filterBy)
}

function onSetSortBy(prop) {
  isDesc = !isDesc
  const sortBy = {
    [prop]: isDesc ? -1 : 1,
  }
  setBookSort(sortBy)
  renderBooks()
}

function onNextPage() {
  nextPage()
  renderBooks()
}

function onSetView(viewType) {
  setView(viewType)
  renderBooks()
}

function renderAddBookModal() {
  document.querySelector('.actions-form').innerHTML = ''
  var strHtml = `
 
  <form class="add-book-modal">
  <h2>Adding New Book Form</h2>
        <div class="container">
        <button title="Close" class="btn-remove" onclick="onCloseActionsModal()">X</button>
            <label><b>Book name</b></label>
            <input type="text" placeholder="Enter Book Name" name="book-name" required>

            <label><b>Price</b></label>
            <input type="number" placeholder="Enter Price" name="book-price" required>
            <br>
            <label><b>Book Cover</b></label>
            <input type="text" placeholder="Paste img URL" name="imgURL" >
                   <div class="clearfix">
                <button type="button" onclick="onCloseActionsModal()" class="cancel-btn">Cancel</button>
                <button type="submit" class="form-submit-btn" onclick="onSubmitBook(event)">Create New Book</button>
            </div>
        </div>
    </form>
</div>
`
  document.querySelector('.actions-form').innerHTML = strHtml
}

function renderUpdateModal() {
  document.querySelector('.actions-form').innerHTML = ''
  var strHtml = `
 
<h2>Updating Book Info</h2>
    <form class="modal-content">
        <div class="container">
              <label><b>Price</b></label>
            <input type="number" placeholder="Enter New Price" name="book-price" required>
            <label><b>Book Cover</b></label>
            <input type="text" placeholder="Update Book img URL" name="imgURL" >
                   <div class="clearfix">
                <button type="button" onclick="onCloseActionsModal()" class="cancelbtn">Cancel</button>
                <button type="submit" class="formSubmit" onclick="onSubmitUpdate(event)">Update Details</button>
            </div>
        </div>
    </form>
</div>
`
  document.querySelector('.actions-form').innerHTML = strHtml
}

function onCloseActionsModal() {
  var modal = document.querySelector('.actions-form')
  modal.style.display = 'none'
}

function onSubmitBook(ev) {
  ev.preventDefault()
  var bookName = document.querySelector('[name="book-name"]').value
  var bookPrice = document.querySelector('[name="book-price"]').value
  var imgURL = document.querySelector('[name="imgURL"]').value
  if (bookName === '') return
  addBook(bookName, bookPrice, imgURL)
  onCloseActionsModal()
  renderBooks()
}

function onSubmitUpdate(ev) {
  ev.preventDefault()
  var bookPrice = document.querySelector('[name="book-price"]').value
  var imgURL = document.querySelector('[name="imgURL"]').value
  if (!bookPrice && !imgURL) return
  updateBook(gCurrBookId, bookPrice, imgURL)
  onCloseActionsModal()
  renderBooks()
}

function onSetLang(lang) {
  setLang(lang)
  setDirection(lang)
  doTrans()
  renderBooks()
}

function setDirection(lang) {
  if (lang === 'he') document.body.classList.add('rtl')
  else document.body.classList.remove('rtl')
}
