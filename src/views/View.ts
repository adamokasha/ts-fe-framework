import { Model } from "../models/Model";

interface ModelForView {
  on(event: string, callback: () => void): void;
}
// Model is generic and needs a type, so we need to pass in second generic type
// K could be UserProps for example, where T is User
export abstract class View<T extends Model<K>, K> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  bindModel(): void {
    this.model.on("change", () => this.render());
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
