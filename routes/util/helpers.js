const TAG = '-- helpers.js --';

global.makeResult = (statusCode, message) => {
    const result = {
        "http_code": statusCode,
        "message": message
    };
    return result;
};

global.setSuccessMsg = (message) => {
    const result = {
        "message": message,
        "error": ""
    };
    return result;
};

global.setErrorMsg = (error) => {
    const result = {
        "message": "",
        "error": error
    };
    return result;
};

global.makeErrorResponse = (err) => {
    if (err && err.http_code) {
        return err;
    } else {
        var resp = {
            http_code: 400,
            message: {
                "message" : "",
                "error" :err.stack ? err.stack : err}
        }
        return resp;
    }
}

global.checkCustomerSession = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        console.log(`Failed User session check`);
        var resp = global.makeResult(401, setErrorMsg('No User Session Found'));
        res.statusCode = resp.http_code;
        res.json(resp.message);
    }
}