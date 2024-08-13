import express from "express";
import fileDb from "../fileDb";
import {IMessages, MessagesMutation} from "../types";

const MessagesRouter = express.Router();

MessagesRouter.get('/', async (req, res) => {
    const queryDate = req.query.datetime as string;
    let messages: IMessages[] = await fileDb.getItems();

    if (queryDate) {
        const date = new Date(queryDate);
        if (isNaN(date.getTime())) {
            return res.status(400).json({ error: "Invalid date" });
        }
        messages = messages.filter(message => new Date(message.datetime) > date);
    }
    const result = messages.slice(-30);
    return res.json(result);
});

MessagesRouter.post('/', async(req, res) => {
    if (!req.body.author || !req.body.message) {
        return res.status(400).send({error: "Author and message must be present in the request"});
    }
    const message: MessagesMutation = {
        author: req.body.author,
        message: req.body.message,
    };
    const savedProduct = await fileDb.addItem(message);
    return res.send(savedProduct);
});

export default MessagesRouter;