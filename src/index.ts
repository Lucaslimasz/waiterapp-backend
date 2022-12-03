import path from 'node:path';
import express from 'express';
import mongoose from 'mongoose';

import {router} from './router';


mongoose
    .connect('mongodb+srv://lucas:qwe12345@cluster0.dlbms.mongodb.net/test')
    .then(() =>{
        const app = express();
        const port = process.env.PORT || 3000;

        app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
        app.use(express.json());
        app.use(router);

        app.listen(3001, () => {
            console.log(`🔥 server is running on port ${port}`);
        });

    })
    .catch((err) => console.log('erro ao conectar no mongodb'));
