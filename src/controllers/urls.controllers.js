import { nanoid } from "nanoid";
import { deleteUrl, getUrl, openShortUrl, postShorten } from "../repositores/url.repository.js";

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const { userId } = res.locals;
    try {
        const shortUrl = nanoid(8);
        const result = await postShorten(userId, shortUrl, url);
        res.status(201).send(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function getUrlById(req, res) {
    const { id } = req.params;

    try {
        const result = await getUrl(id);
        if (result.rows.length === 0) return res.status(404).send("URL não encontrada!");

        res.status(200).send(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

export async function openUrl(req, res) {
    const { id, url } = res.locals;
    try {
        await openShortUrl(id);
        res.redirect(url);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


export async function deleteUrlById(req, res) {
    const { id } = req.params;

    try {
        await deleteUrl(id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
