const TAG = '- User Controller.js -'
const user = require('../model/user');

exports.login = (input) => {
    return new Promise((resolve, reject) =>{
        console.log(`${TAG} Inside user login,input : ${JSON.stringify(input)}`);
        global.services.userService.getUserDetails(input)
        .then(res => {
            resolve(res.id)
        })
        .catch(err => reject(err))
    });
}

exports.inbound = async (input) => {
    try{
        var userModel = new user();
        console.log(`${TAG} Inside user inbound,input : ${JSON.stringify(input)}`);
        await userModel.validateInput(input);
        input.which = "to"
        await global.services.userService.checkPhoneNumber(input);
        if(global.config.constants.stop.indexOf(input.text) != -1){
            await userModel.storeInRedis(input);
        }
        //make success obj inbound sms ok
        return Promise.resolve(makeResult(200,setSuccessMsg("inbound sms ok")))
        
    }catch(err){
        return Promise.reject(err);
    };
}

exports.outbound = async (input) => {
    try{
        var userModel = new user();
        console.log(`${TAG} Inside user outbound,input : ${JSON.stringify(input)}`);
        await userModel.validateInput(input);
        input.which = "from";
        await global.services.userService.checkPhoneNumber(input);
        await userModel.checkForStop(input);
        await userModel.checkApiRequestCount(input);
        //make success obj outbound sms ok
        return Promise.resolve(makeResult(200,setSuccessMsg("outbound sms ok")))
        
    }catch(err){
        return Promise.reject(err);
    };
}
