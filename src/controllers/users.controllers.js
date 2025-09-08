import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { db } from "../database/database.connection.js";


export async function registerUser(req, res) {
    const { name, email, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    try {
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, hash]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function login(req, res) {
    const { password } = req.body;
    const { id, savedPassword } = res.locals;
    try {
        const correctPassword = bcrypt.compareSync(password, savedPassword);
        if (!correctPassword) return res.status(401).send("Senha incorreta");
        const token = uuid();
        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token]);
        res.status(200).send({ token: token })
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function getUsers(req, res) {
    const { user } = res.locals;
    try {
        const urlsResult = await db.query(`SELECT id, "shortUrl", url, "visitCount" FROM urls WHERE "userId" = $1`, [user.id]);
        const totalVisitCount = urlsResult.rows.reduce((sum, url) => sum + url.visitCount, 0);
          const response = {
                            id: user.id,
                            name: user.name,
                            visitCount: totalVisitCount,
                            shortenedUrls: urlsResult.rows
                            };

        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
};