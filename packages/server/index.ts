import dotenv from "dotenv";
import path from 'path';
import fs from 'fs';
dotenv.config();

import express, {Response} from "express";
import { createClientAndConnect } from "./db";

// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'

const app = express();

const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

app.use(express.static(path.resolve(__dirname, '../client/dist/client')));

app.get('/', (req, res: Response) => {
    const result = render(req.url);
    const template = path.resolve(__dirname, '../client/dist/client/index.html');
    const htmlString = fs.readFileSync(template, 'utf-8');
    const newString = htmlString.replace('<!--ssr-outlet-->', result)
    res.send(newString)
});

app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
