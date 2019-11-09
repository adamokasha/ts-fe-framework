import { User } from "./models/User";

const user = new User({ name: "New Record", age: 0 });

console.log(user.get("name"));

user.on("change", () => console.log("user was changed"));
user.set({ name: "New Name" });
