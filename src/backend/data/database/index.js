const mongoose = require('mongoose');
const Counter = require('backend/data/model/_counter');
const Role = require('backend/data/model/role');
const User = require('backend/data/model/user');
const Post = require('backend/data/model/post');
const Category = require('backend/data/model/category');
const About = require('backend/data/model/about');

mongoose.Promise = global.Promise;

const dbUsername = process.env.DB_USERNAME || '';
const dbPassword = process.env.DB_PASSWORD || '';
const dbIp = process.env.DB_IP || 'localhost';

const url = `mongodb://${dbUsername}:${dbPassword}@${dbIp}:27017`;
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'blog',
};

mongoose
    .connect(url, connectionParams)
    .then((v) => {
        console.log('Connected to database ');
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

const DB = {
    mongoose,
    Counter,
    Role,
    User,
    Post,
    Category,
    About,
};

module.exports = DB;
