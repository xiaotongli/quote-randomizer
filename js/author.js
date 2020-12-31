class Author {
  constructor(el, author) {
    this.node = document.createElement('div');
    this.node.setAttribute('id', 'author');
    el.appendChild(this.node);

    this.node.innerHTML = author;
  }
}
