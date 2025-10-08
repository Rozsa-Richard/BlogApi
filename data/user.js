import db from "./db.js";

db.prepare(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, email STRING, password STRING)"
).run();

export const saveUser = (name, email, password) => {
  db.prepare("INSERT INTO users (name, email, password) VALUES (?,?,?)").run(name,email,password);
};
export const getUserByMail = (email) => {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
};
