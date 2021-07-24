import Listeners from "./Listeners";
import Card from "./Card";

export default class Widget {
  constructor() {
    this.widget = document.querySelector(".widget-container");
    this.columns = document.querySelectorAll(".widget-column");
    this.cardBoxes = document.querySelectorAll(".column-cards-box");

    this.draggedEl = null;
    this.clonedEl = null;
    this.capEl = null;
    this.deltas = {};
  }

  init() {
    this.restoreFromStorage();
    this.registerListeners();
  }

  registerListeners() {
    this.columns.forEach((column) => {
      column.addEventListener("click", (event) => this.onClick(event));
    });

    this.cardBoxes.forEach((box) => {
      box.addEventListener("mouseover", (event) => Widget.onMouseOver(event));
      box.addEventListener("mousedown", (event) => this.onMouseDown(event));
    });

    this.widget.addEventListener("mouseout", (event) => this.onMouseLeave(event));
    this.widget.addEventListener("mouseup", (event) => this.onMouseUp(event));

    window.addEventListener("beforeunload", () => this.saveState());
    document.addEventListener("mousemove", (event) => this.onMouseMove(event));
  }

  onClick(event) {
    Listeners.onClick.call(this, event);
  }

  static onMouseOver(event) {
    Listeners.onMouseOver(event);
  }

  onMouseDown(event) {
    Listeners.onMouseDown.call(this, event);
  }

  onMouseMove(event) {
    Listeners.onMouseMove.call(this, event);
  }

  onMouseLeave(event) {
    Listeners.onMouseLeave.call(this, event);
  }

  onMouseUp(event) {
    Listeners.onMouseUp.call(this, event);
  }

  restoreFromStorage() {
    const storage = localStorage.getItem("trello");

    if (!storage) {
      this.state = {
        todo: [],
        progress: [],
        done: [],
      };
      return;
    }

    this.state = JSON.parse(storage);

    Object.entries(this.state).forEach((entry) => {
      if (entry[0].length) {
        entry[1].forEach((item) => {
          const card = new Card(item.title);
          card.bindToDOM(document.querySelector(`[data-name=${entry[0]}]`));
        });
      }
    });
  }

  saveState() {
    localStorage.setItem("trello", JSON.stringify(this.state));
  }
}
