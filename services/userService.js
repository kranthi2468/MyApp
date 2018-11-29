var TAG = 'userService.js '
var pgDb = require('../environment/pgDatabase')
const pgClient = pgDb.pgClient;

class userService {

    getUserDetails(input){
        return new Promise((resolve, reject)=> {
            console.log(TAG + "getUserDetails - params "+ JSON.stringify(input));
            let dbQuery = `SELECT * FROM account WHERE username='${input.userName}' AND auth_id='${input.password}' `;
            console.log(dbQuery)
            pgClient.query(dbQuery)
            .then(resultm =>{
                console.log("db result", resultm.rows)
                if(resultm.rows.length > 0){
                    return resolve(resultm.rows[0])
                }else{
                    return reject(global.makeResult(400,setErrorMsg("user details not found for id: "+input.userName)))
                }
            }).catch(err => {
                console.log(TAG + "getUserDetails - err: "+ JSON.stringify(err))
                reject(global.makeErrorResponse(err));
            });
        })
    }

    checkPhoneNumber(input){
        return new Promise((resolve, reject)=> {
            console.log(TAG + "checkPhoneNumber - params "+ JSON.stringify(input));
            let dbQuery = `SELECT * FROM phone_number WHERE number='${input[input.which]}' AND account_id='${input.id}' `;
            console.log(dbQuery)
            pgClient.query(dbQuery)
            .then(resultm =>{
                let response;
                console.log("db result", resultm.rows)
                if(resultm.rows.length > 0){
                    console.log(input.which," found",resultm.rows[0])
                    return resolve(resultm.rows[0])
                }else{
                    //make error obj of "to parameter not found"
                    response= setErrorMsg(input.which+" parameter not found");
                    return reject(global.makeResult(400,response))
                }
            }).catch(err => {
                console.log(TAG + "checkPhoneNumber - err: "+ JSON.stringify(err))
                reject(global.makeErrorResponse(err));
            });
        })
    }
}

module.exports = function () {
    return new userService();
};