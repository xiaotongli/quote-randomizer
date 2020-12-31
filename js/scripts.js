// random button at top of page;
const randomize = document.createElement('button');
randomize.innerHTML = 'random ' + '<i class="material-icons md-16">cached</i>';
document.body.appendChild(randomize);

// Create a request variable and assign a new XMLHttpRequest object to it.
const request = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://quote-garden.herokuapp.com/api/v3/quotes', true);

request.onload = function () {
  const data = JSON.parse(this.response);
  let quoteInd = 0;
  const quoteBox = new Quote(document.body, '');
  const quoteAuthor = new Author(document.body, '');
  const quoteGenre = new Genre(document.body, '');
  // const authorArrow = document.createElement('div');
  // authorArrow.setAttribute('id', 'arrow');

  function generateQuote() {
    if (quoteInd === 9) {
      request.send();
      quoteInd = 0;
    } else {
      quoteInd += 1;
      quoteBox.node.innerHTML = `"${data.data[quoteInd].quoteText}"`;
      // quoteBox = new Quote(document.body, quoteText);
      quoteAuthor.node.innerHTML = data.data[quoteInd].quoteAuthor;
      // authorArrow.innerHTML = '<i class="material-icons md-24">arrow_right_alt</i>';
      quoteGenre.node.innerHTML = data.data[quoteInd].quoteGenre;
      // quoteAuthor.appendChild(authorArrow);
      quoteAuthor.node.appendChild(quoteGenre.node);
    }
  }

  randomize.addEventListener('click', generateQuote);
  generateQuote();

  quoteAuthor.node.addEventListener('click', loadAuthor);

  function loadAuthor() {
    const author = data.data[quoteInd].quoteAuthor;
    request.open('GET', `https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}`, true);
    request.onload = function () {
      const data = JSON.parse(this.response);
      for (let i = 0; i < data.data.length; i++) {
        const quotesForAuthor = new Quote(document.body, `"${data.data[i].quoteText}"`);
      }
    };
    request.send();
  }
};

// Send request
request.send();
