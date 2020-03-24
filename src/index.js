import config from './config/config';
import app from './config/express';
import db from './models';

const { port } = config;

db.connectDb();

app.listen(port, () => console.log(`app listening on port ${port}!`));
