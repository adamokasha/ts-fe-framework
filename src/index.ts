import { User } from "./models/User";

const user = new User({ name: "joe", age: 12 });

user.on("change", () => {});
user.on("change", () => {});
user.on("sth", () => {});
console.log(user);
