// random button at top of page;
const randomize = document.createElement('button');
randomize.innerHTML = 'random ' + '<i class="material-icons md-16">cached</i>';
document.body.appendChild(randomize);

// Create a request variable and assign a new XMLHttpRequest object to it.
const requestRandom = new XMLHttpRequest();
const requestAuthor = new XMLHttpRequest();

let headerAuthor = document.createElement('h2');
headerAuthor.innerHTML = 'Author Name';
document.body.appendChild(headerAuthor);
headerAuthor.style.visibility = 'hidden';

let dataRandom;
let dataQuotes;
let author;
const quoteBox = new Quote(document.body, '');
quoteBox.node.setAttribute('class', 'quote');
const quoteAuthor = new Author(document.body, '');
quoteAuthor.node.addEventListener('click', loadAuthor);
const quoteGenre = new Genre(document.body, '');
let quotesForAuthor;
let divsToHide;

function generateQuote() {
  // Open a new connection, using the GET request on the URL endpoint
  requestRandom.open('GET', 'https://quote-garden.herokuapp.com/api/v3/quotes/random', true);

  // Send request
  requestRandom.send();

  requestRandom.onload = function () {
    dataRandom = JSON.parse(this.response);
    // const authorArrow = document.createElement('div');
    // authorArrow.setAttribute('id', 'arrow');
    // $(".quote").remove();

    headerAuthor.style.visibility = 'hidden';

    divsToHide = document.querySelectorAll('div.quotes');
    for (let i = 0; i < divsToHide.length; i++) {
      divsToHide[i].remove();
    }

    if (!quoteBox.node.isConnected) {
      document.body.appendChild(quoteBox.node);
      document.body.appendChild(quoteAuthor.node);
      // document.body.appendChild(quoteGenre.node);
      // authorArrow.innerHTML = '<i class="material-icons md-24">arrow_right_alt</i>';
      // quoteAuthor.appendChild(authorArrow);
    }

    quoteBox.node.innerHTML = `"${dataRandom.data[0].quoteText}"`;
    quoteAuthor.node.innerHTML = dataRandom.data[0].quoteAuthor;
    quoteGenre.node.innerHTML = dataRandom.data[0].quoteGenre;
    quoteAuthor.node.appendChild(quoteGenre.node);
  };
}

randomize.addEventListener('click', generateQuote);
generateQuote();

function loadAuthor() {
  quoteBox.node.remove();
  quoteAuthor.node.remove();
  // quoteGenre.node.remove();

  author = dataRandom.data[0].quoteAuthor;
  headerAuthor.innerHTML = author;
  headerAuthor.style.visibility = 'visible';
  requestAuthor.open('GET', `https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}`, true);
  requestAuthor.onload = function () {
    dataQuotes = JSON.parse(this.response);
    for (let i = 0; i < dataQuotes.data.length; i++) {
      quotesForAuthor = new Quote(document.body, `"${dataQuotes.data[i].quoteText}"`);
    }
  };
  requestAuthor.send();
}
