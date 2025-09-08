import { db } from "..//database/database.connection.js";

export async function validateAddUser(req, res, next) {
    const { email } = req.body;
    try {
        const userExists = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (userExists.rows.length > 0) return res.status(409).send("email já cadastrado, tente outro!");
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function userExists(req, res, next) {
    const { email } = req.body;
    try {
        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (user.rows.length === 0) return res.status(404).send("E-mail não cadastrado");
        const { id, password: savedPassword } = user.rows[0];
        res.locals.savedPassword = savedPassword;
        res.locals.id = id;
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}