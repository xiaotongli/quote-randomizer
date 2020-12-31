class Genre {
  constructor(el, genre) {
    this.node = document.createElement('div');
    this.node.setAttribute('id', 'genre');
    el.appendChild(this.node);

    this.node.innerHTML = genre;
  }
}
