var conString =
  // "postgres://uvwnnsvo:vHZQpk0FDyFN26jIdsuLWiBWPtTjYbj7@ruby.db.elephantsql.com:5432/uvwnnsvo";
  // var conString = "postgres://klkiwnmx:qPa-F9bVyWD9xWTMNQEKLGRSGQJAIRvw@rajje.db.elephantsql.com:5432/klkiwnmx"
  (conString =
    "postgres://agwnjlhpshmsfn:503d8e0b0005dd5334a62e5af4f0e302bff4f26afc89fbe650da8ec12b7c636b@ec2-3-91-139-25.compute-1.amazonaws.com:5432/dbcu0858dgc8ri");
const Pool = require("pg").Pool;
const pool = new Pool({
  connectionString: conString,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = pool;

// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// client.connect();

// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });
