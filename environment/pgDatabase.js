var TAG = 'pgDatabase.js';
var pg = require('pg');

exports.createpgConn = function (callback) {
    const pool = new pg.Pool({
        host: 'postgres-aws.cupzlzijgrdl.eu-west-1.rds.amazonaws.com',
        user: 'postgres',
        database: 'postgres',
        password: 'postgrespass',
        port: 5432
    });
    pool.connect(function(err,client,done) {
        if(err){
            console.log("not able to get connection "+ err);
            return callback(true,err);
        }
        else{
            console.log("connected to pg db successfully..")
            exports.pgClient = client;
            exports.pgPool = pool;
            callback(false)
        }
        // let u = 'plivo3';
        // let p = '9LLV6I4ZWI'
        // let q = `SELECT * FROM account WHERE username='${u}' AND auth_id='${p}' `;
        // client.query(q,function(err,result) {
        //     done(); // closing the connection;
        //     if(err){
        //         console.log(err);
        //         return err;
        //     }else{
        //         console.log(result.rows)
        //         return result.rows;
        //     }
        // });
     });
}