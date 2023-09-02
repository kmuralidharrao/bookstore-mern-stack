import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5173",
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type']
})); 

app.get('/',(request, response)=>{
    return response.status(234).send("Welcome!!!");
});

app.use('/books', bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App connected to database");
        app.listen(PORT, () =>{
            console.log(`App is listening to port: ${PORT}`)
        });        
    })
    .catch((error)=>{
        console.log(error);
    })
