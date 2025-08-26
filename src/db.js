import {DatabaseSync} from "expo-sqlite";

const db = new DatabaseSync(":memory:");

db.exec(`CREATE TABLE users 
    (
    id integer primary key autoincrement,
    username text unique not null,
    password text not null
    )`)

db.exec(`CREATE TABLE todos
    (
    id integer primary key autoincrement,
    user_id integer,
    task text not null,
    completed boolean not null default false,
    foreign key (user_id) references users(id)
    )`)



export default db;
