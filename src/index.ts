import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';
import http from 'node:http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import {router} from './router';


const app = express();
const server = http.createServer(app);
export const io = new Server(server);
dotenv.config();


mongoose
    .connect(`${process.env.LINK_CONNECTION_MONGODB}`)
    .then(() =>{
        const PORT = process.env.PORT || 3001;

        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
        });

        app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
        app.use(express.json());
        app.use(router);

        server.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
        });
    }).catch(() => console.log('Erro ao conectar no MongoDB'));
