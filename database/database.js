require('dotenv').config();
const mysql = require('mysql');


const conn_pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB,
  password: process.env.DB_PASS,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0
})

const executeQuery = (query, params) => new Promise ((resolve, reject) => {
  try{
    conn_pool.getConnection((err, connection) => {
      if (err) {
        console.log('error getting a db connection, err msg:');
        console.log(err);
      }
      connection.query(query, params, (err, result) => {
        connection.release()
        if (err) reject(err);
        resolve(result);
      })
    })
  }catch (err){
    console.log('error in db pipeline. error msg:');
    console.log(err);
  }
}).catch((err) => {
   console.log('error in db query pipeline. err msg:');
   console.log(err);
});

const tokenCheckPipeline = ((token, func) => new Promise((resolve, reject) => {
  try{
    executeQuery(
      'SELECT * FROM token_table',
      [],
    ).then((result => {
      const parsedResult = JSON.parse(JSON.stringify(result[0]));
      if(token === parsedResult.TOKEN) {
        fun !== undefined ? resolve(func) : resolve(true);
      } else {
        console.log('incorrect token.');
        reject('error, socket token auth fail.');
      }
    }))
  }catch(err){
    console.log('error in token check db pipeline, err msg:');
    console.log(err);
  }
}))


module.exports = {
  tokenCheckPipeline
}
