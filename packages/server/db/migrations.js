const dotenv = require('dotenv');
const { Client } = require('pg');
const { migrate } = require('postgres-migrations');

dotenv.config();

const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  user: process.env.user,
  password: process.env.PASSWORD
};

const client = new Client(config);

async function init() {
  await client.connect()
  try {
    const res = await migrate({ client }, __dirname + '/migrations',{logger: console.log});
    console.log(res);
  } catch(err) {
    console.log("Migration failed:", err)
  } finally{
    await client.end();
  }
}

init();
