import { db } from "../database/database.connection.js";

export async function checkShortUrlExist(req, res, next) {
    const { shortUrl } = req.params;
    try {
        const resultUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
        if (resultUrl.rows.length === 0) return res.status(404).send("Url não existe!");

        const { id, url } = resultUrl.rows[0];
        res.locals.id = id;
        res.locals.url = url;

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function checkUrlById(req, res, next) {
    const { id } = req.params;
    const { user } = res.locals;
    try{
        const urlExist = await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
        if(urlExist.rows.length === 0) return res.status(404).send("Url não existe!");

        const url = urlExist.rows[0];
        if(url.userId !== user.id)return res.sendStatus(401);

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
};