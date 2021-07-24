export default class Card {
  constructor(text) {
    this.text = text;
    this.cardEl = this.createElement();
  }

  createMarkup() {
    return ` 
      <header class="card-content">
        ${this.text}
        <span class="card-delete hidden" title="Удалить карточку">&#xd7;</span>
      </header>
      `;
  }

  createElement() {
    const card = document.createElement("div");
    card.classList.add("card");
    card.insertAdjacentHTML("beforeend", this.createMarkup());

    return card;
  }

  bindToDOM(container) {
    container.append(this.cardEl);
  }
}
