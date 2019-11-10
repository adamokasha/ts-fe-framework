import { User } from "../models/User";

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }

  bindModel(): void {
    this.model.on("change", () => this.render());
  }
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick
    };
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input");
    if (input) {
      const name = input.value;

      this.model.set({ name });
    }
  };

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User name: ${this.model.get("name")}</div>
        <div>User age: ${this.model.get("age")}</div>
        <input/>
        <button class="set-name">Change name</button>
        <button class="set-age">Set Random Age</button>
      </div>
    `;
  }

  /**
   * bindEvents
   *
   * Binds event to DocumentFragment. Document
   * fragments are html code that is not rendered
   * into the DOM immediately, but waiting in
   * memory to be rendere programmatically using js.
   *
   * @param fragment
   */
  bindEvents(fragment: DocumentFragment) {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render() {
    // clear parent
    this.parent.innerHTML = "";

    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    // bind events
    this.bindEvents(templateElement.content);

    this.parent.append(templateElement.content);
  }
}
