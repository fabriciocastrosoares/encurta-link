import { db } from "../database/database.connection.js";

export function postShorten(userId, shortUrl, url) {
    return db.query(`INSERT INTO urls ("userId", "shortUrl", url) VALUES ($1, $2, $3) RETURNING id, "shortUrl";`, [userId, shortUrl, url]);
};

export function getUrl(id) {
    return db.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1;`, [id]);
};

export function openShortUrl(id){
    return db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1;`, [id]);
};

export function deleteUrl(id){
    return db.query(`DELETE FROM urls WHERE id = $1;`, [id]);
};