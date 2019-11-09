import { User } from "./models/User";

const user = new User({ name: "joe", age: 12 });
user.set({ name: "jane", age: 32 });
user.set({ name: "john" });
console.log(user);
