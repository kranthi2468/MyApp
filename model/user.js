"use strict"
const TAG = 'baseUser.js'
const redisCon = require('../environment/redis')
const constants =  require('./config/constants')
const V = require('jsonschema').Validator;
const validator = new V();
const validations = require("./config/validation.js");

class UserBaseClass {

    constructor() {

    }

    validateInput(input){
        return new Promise((resolve, reject) =>{
            var validation_result = validator.validate(input, validations.validationSchema);
            let response;
            // var errors = []
            if (validation_result.errors.length > 0 ) {
                // validation_result.errors.forEach(error =>{
                //     console.log(error)
                //     errors.push(error.stack)
                // })
                // console.log(TAG + "Bad or ill-formed request. \n" + JSON.stringify(errors));
                if(validation_result.errors[0].name == 'required'){
                    response = setErrorMsg(`${validation_result.errors[0].property.slice(9)} is missing`); 
                }else{
                    response = setErrorMsg(`${validation_result.errors[0].property.slice(9)} is invalid`); 
                }
                return reject(global.makeResult(400,response));
            }else{
                resolve()
            }
        });
    }

    storeInRedis(input){
        return new Promise((resolve, reject) =>{
            try{
                console.log("in storeInRedis");
                var fromToKey = input.from+input.to;
                var redisConnection = redisCon.redisConn;
                redisConnection.setex(fromToKey,constants.expireSTOP,input.text)
                // redisConnection.get("hii")
                // .then(res =>{
                //     console.log("redis : ",res)
                // })
                return resolve()
            }catch(err){
                console.log(TAG + " storeInRedis - err: "+JSON.stringify(err))
                return reject(global.makeErrorResponse(err))
            }
        });
    }

    checkForStop(input){
        return new Promise((resolve, reject) =>{
            try{
                console.log("in checkForStop");
                var fromToKey = input.from+input.to;
                var redisConnection = redisCon.redisConn;
                redisConnection.get(fromToKey)
                .then(res =>{
                    console.log("redis : ",res)
                    if(res){
                        return reject(makeResult(400,setErrorMsg(`sms from ${input.from} to ${input.to} blocked by STOP request`)))
                    }else{
                        return resolve()
                    }
                })
            }catch(err){
                console.log(TAG + " checkForStop - err: "+JSON.stringify(err))
                return reject(global.makeErrorResponse(err))
            }
        });
    }

    checkApiRequestCount(input){
        return new Promise((resolve, reject) =>{
            try{
                console.log("in checkApiRequestCount");
                var redisConnection = redisCon.redisConn;
                redisConnection.get(input.from)
                .then(res =>{
                    console.log("Limit redis : ",res)
                    if(res){
                        if(parseInt(res) < constants.maxSmsLimit){
                            //increment count 
                            redisConnection.incr(input.from);
                            console.log("redis value incremented for:, ",input.from);
                            return resolve();
                        }else{
                            console.log("max limit for day for: ",input.from);
                            return reject(makeResult(400,setErrorMsg("limit reached for from "+input.from)))
                        }
                    }else{
                        //first time, so set count to 1 and expire 24hrs
                        redisConnection.setex(input.from,constants.expireLIMIT,1);
                        console.log("redis key set for:, ",input.from);
                        return resolve()
                    }
                })
            }catch(err){
                console.log(TAG + " checkApiRequestCount - err: "+JSON.stringify(err))
                return reject(global.makeErrorResponse(err))
            }
        });
    }

}

module.exports = UserBaseClass;