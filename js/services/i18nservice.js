'use strict'
const gTrans = {
  title: {
    en: 'Welcome to our bookshop',
    he: 'תשומת ספרים',
  },
  'lagn-selctor': {
    en: 'Select language: ',
    he: ' :בחר שפה',
  },
  'filter-title': {
    en: 'Filter your books',
    he: 'סנן ספרים',
  },
  'filter-price-title': {
    en: 'Max Price:',
    he: 'מחיר מקסימלי:',
  },
  'filter-rate-title': {
    en: 'Minimum Rate:',
    he: 'דרוג מינימלי:',
  },
  'search-placeholder': {
    en: 'Search by name...',
    he: 'חפש לפי שם...',
  },
  'sort-by-name': {
    en: 'Sort by Name',
    he: 'מיין לפי שם',
  },
  'sort-by-price': {
    en: 'Sort by Price',
    he: 'מיין לפי מחיר',
  },
  'add-book': {
    en: 'Add new book',
    he: 'הוסף ספר חדש',
  },
  'next-page': {
    en: 'Next page',
    he: 'לדף הבא',
  },
  price: {
    en: 'Price',
    he: 'מחיר',
  },
  'modal-desc': {
    en: 'Book Description',
    he: 'על הספר',
  },
  'modal-rate': {
    en: 'Rate this Book:',
    he: 'דרג את הספר',
  },
  'modal-close': {
    en: 'Close',
    he: 'סגור',
  },
  'modal-price': {
    en: 'Price',
    he: 'מחיר',
  },
  update: {
    en: 'Update',
    he: 'עדכן',
  },
  details: {
    en: 'Details',
    he: 'פרטים',
  },
  update: {
    en: 'Update',
    he: 'עדכן',
  },
  delete: {
    en: 'Delete',
    he: 'מחק',
  },
  'book-title': {
    en: 'Title',
    he: 'שם הספר',
  },
  actions: {
    en: 'Actions',
    he: 'פעולות',
  },
}

const gCurrencies = {
  en: {
    format: 'en-US',
    curSign: 'USD',
  },
  he: {
    format: 'he-IL',
    curSign: 'ILS',
  },
}

let gCurrLang = 'en'

function getTrans(transKey) {
  const transMap = gTrans[transKey]
  if (!transMap) return 'UNKNOWN'

  let trans = transMap[gCurrLang]
  if (!trans) trans = transMap.en
  return trans
}

function doTrans() {
  const els = document.querySelectorAll('[data-trans]')
  els.forEach((el) => {
    const transKey = el.dataset.trans
    const trans = getTrans(transKey)
    el.innerText = trans
    if (el.placeholder) el.placeholder = trans
  })
}

function setLang(lang) {
  gCurrLang = lang
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatDate(time) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }
  return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}

function getCurrency() {
  const currencyMap = gCurrencies
  if (!currencyMap) return 'UNKNOWN'
  let currency = currencyMap[gCurrLang]
  if (!currency) currency = currencyMap.en
  return currency
}

function formatCurrency(price) {
  const currency = getCurrency()
  return new Intl.NumberFormat(currency.format, {
    style: 'currency',
    currency: currency.curSign,
  }).format(price)
}
