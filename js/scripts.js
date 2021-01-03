// different API endpoints
const urlRandom = 'https://quote-garden.herokuapp.com/api/v3/quotes/random';
let urlAuthor = 'https://quote-garden.herokuapp.com/api/v3/quotes';

const quoteBox = $('.quote')[0];
const info = $('.info')[0];
const quoteAuthor = $('.author')[0];
const quoteGenre = $('.genre')[0];
const title = $('#authorTitle')[0];
const btn = $('#random')[0];
let author;
let quotesForAuthor;
let divsToHide;

function displayQuote(dataRandom) {
  title.style.visibility = 'hidden';

  divsToHide = $('.quotes');
  for (let i = 0; i < divsToHide.length; i++) {
    divsToHide[i].remove();
  }

  if (!quoteBox.isConnected) {
    document.body.appendChild(quoteBox);
    document.body.appendChild(info);
  }

  quoteBox.innerHTML = `"${dataRandom.data[0].quoteText}"`;
  quoteAuthor.innerHTML = dataRandom.data[0].quoteAuthor;
  quoteGenre.innerHTML = dataRandom.data[0].quoteGenre;

  info.style.visibility = 'visible';
  info.addEventListener('click', getQuotesByAuthor);
}

// open a new connection, using the GET request for a random quote
function getQuote() {
  fetch(urlRandom)
    .then((resp) => resp.json())
    .then((dataRandom) => displayQuote(dataRandom))
    .catch((error) => {
      console.log(error);
    });
}

function displayAuthor(dataAuthor) {
  quoteBox.remove();
  info.remove();
  // quoteGenre.remove();

  title.innerHTML = author;
  title.style.visibility = 'visible';

  for (let i = 0; i < dataAuthor.data.length; i++) {
    quotesForAuthor = new Quote(document.body, `"${dataAuthor.data[i].quoteText}"`);
  }
}

// open a new connection, using the GET request for all quotes by a specific author
function getQuotesByAuthor() {
  author = quoteAuthor.innerHTML;

  fetch(`${urlAuthor}?author=${author}`)
    .then((resp) => resp.json())
    .then((dataAuthor) => displayAuthor(dataAuthor))
    .catch((error) => {
      console.log(error);
    });
}

btn.addEventListener('click', getQuote);
getQuote();
