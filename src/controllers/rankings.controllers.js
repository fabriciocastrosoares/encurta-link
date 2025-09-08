import { db } from "../database/database.connection.js";

export async function getRanking(req, res) {
    try {

        const result = await db.query(`
            SELECT 
                users.id,
                users.name,
                    COUNT(urls.id) AS "linksCount",
                    COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
                        FROM users
                        LEFT JOIN urls
                            ON users.id = urls."userId"
                                GROUP BY users.id
                                ORDER BY "visitCount" DESC
                                LIMIT 10;
    `);

        res.status(200).send(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};