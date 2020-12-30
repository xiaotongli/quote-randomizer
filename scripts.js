// Create a request variable and assign a new XMLHttpRequest object to it.
const request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://quote-garden.herokuapp.com/api/v3/quotes', true);

request.onload = function () {
  const data = JSON.parse(this.response);
  const randomize = document.createElement('button');
  let quoteInd = 0;
  const quoteBox = document.createElement('div');
  const quoteAuthor = document.createElement('div');
  const quoteGenre = document.createElement('div');
  // const authorArrow = document.createElement('div');
  quoteBox.setAttribute('id', 'quote');
  quoteAuthor.setAttribute('id', 'author');
  quoteGenre.setAttribute('id', 'genre');
  // authorArrow.setAttribute('id', 'arrow');

  function generateQuote() {
    if (quoteInd === 9) {
      request.send();
      quoteInd = 0;
    } else {
      quoteInd += 1;
      quoteBox.innerHTML = `"${data.data[quoteInd].quoteText}"`;
      quoteAuthor.innerHTML = data.data[quoteInd].quoteAuthor;
      // authorArrow.innerHTML = '<i class="material-icons md-24">arrow_right_alt</i>';
      quoteGenre.innerHTML = data.data[quoteInd].quoteGenre;
      // quoteAuthor.appendChild(authorArrow);
      quoteAuthor.appendChild(quoteGenre);
    }
  }

  randomize.innerHTML = 'random ' + '<i class="material-icons md-16">cached</i>';
  randomize.addEventListener('click', generateQuote);
  document.body.appendChild(randomize);
  document.body.appendChild(quoteBox);
  document.body.appendChild(quoteAuthor);

  generateQuote();
};

// Send request
request.send();
