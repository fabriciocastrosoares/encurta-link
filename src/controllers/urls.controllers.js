import { db } from "../database/database.connection.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;
    try {
        const shortUrl = nanoid(8);
        const result = await db.query(`INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3) RETURNING id, "shortUrl";`, [userId, shortUrl, url]);
        res.status(201).send(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        const urlExist = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        if (urlExist.rows.length === 0) return res.status(404).send("url não encontrada!");

        const getUrl = urlExist.rows.map(u => {
            return {
                id: u.id,
                shortUrl: u.shortUrl,
                url: u.url
            }
        });
        res.status(200).send(getUrl[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function openUrl(req, res) {
    const { id, url } = res.locals;
    try {
        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1`, [id]);
        res.redirect(url);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


export async function deleteUrlById(req, res) {
    const { id } = req.params;

    try {
        await db.query(`DELETE FROM urls WHERE id = $1;`, [id]);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


