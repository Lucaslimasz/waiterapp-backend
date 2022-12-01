import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose
    .connect('mongodb+srv://lucas:qwe12345@cluster0.dlbms.mongodb.net/test')
    .then(() =>{
        const port = 3001;
        app.listen(3001, () => {
            console.log(`🔥 server is running on port ${port}`);
        });
    })
    .catch((err) => console.log('erro ao conectar no mongodb'));
