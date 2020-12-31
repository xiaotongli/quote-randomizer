class Quote {
  constructor(el, text) {
    this.node = document.createElement('div');
    this.node.setAttribute('id', 'quote');
    el.appendChild(this.node);

    this.node.innerHTML = text;
  }
}
