import {promises as fs} from 'fs';
import {IMessages, MessagesMutation} from "./types";
import {randomUUID} from "node:crypto";

const fileName = './db.json';
let data:IMessages[] = [];

const fileDb = {
    async init () {
        try {
            const fileContents = await fs.readFile(fileName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            data = [];
        }
    },
    async getItems () {
        return data;
    },
    async addItem (item: MessagesMutation) {
        const messages: IMessages = {
            ...item,
            id: randomUUID(),
            datetime: new Date().toISOString(),
        };

        data.push(messages);
        await this.save();
        return messages;
    },
    async save() {
        await fs.writeFile(fileName, JSON.stringify(data, null, 2));
    }
};

export default fileDb;