import mongoose from 'mongoose';
import Counter from 'backend/data/model/_counter';
import Role from 'backend/data/model/role';
import User from 'backend/data/model/user';

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
};

export default DB;
