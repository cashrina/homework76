import express from 'express';
import cors, { CorsOptions } from 'cors';
import MessagesRouter from './routers/messages';
import fileDb from './fileDb';

const app = express();
const port = 8000;

const whitelist = ['http://localhost:5173'];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Invalid origin'));
        }
    }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/messages', MessagesRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server started on port: http://localhost:${port}`);
    });
};

run().catch(console.error);