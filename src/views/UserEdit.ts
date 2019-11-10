import { View } from "./View";
import { User, UserProps } from "../models/User";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";

export class UserEdit extends View<User, UserProps> {
  regionsMap(): { [key: string]: string } {
    return { userShow: ".user-show", userForm: ".user-form" };
  }

  // Acts like a hook before rendering this element
  // to render (and thus nest) different elements inside here.
  // regionsMap above provides the dom node to attach to.
  onRender(): void {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  template(): string {
    return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
      </div>
    `;
  }
}
