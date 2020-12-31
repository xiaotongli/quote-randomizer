class Quote {
  constructor(el, text) {
    this.node = document.createElement('div');
    this.node.setAttribute('class', 'quotes');
    el.appendChild(this.node);

    this.node.innerHTML = text;
  }
}
