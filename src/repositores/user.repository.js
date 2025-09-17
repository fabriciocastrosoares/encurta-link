import { db } from "..//database/database.connection.js";

export function createUser(name, email, password) {
    return db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password]);
};

export function createSession(id, token) {
    return db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [id, token]);
};

