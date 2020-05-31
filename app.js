import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import auth from './middlewares/userAuth'


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

require('dotenv').config()

app.set(express.static('public'));

app.set(userRoutes);

let userDetails = require('./public/models/userSchema.js');
let tempUsername;
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost/LetsChatDB',
  { useNewUrlParser: true, useUnifiedTopology: true });

let connections = [];

app.get('*', (req,res) => {
    res.json({
        message: "This API does not exist"
    });
});


server.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});