var Redis = require('ioredis');


exports.getSessionEncryptionKey = function () {
    return "M7app_auth_red1s_5e5510n_SecretKe7";
}


exports.createRedisConn = function (callback) {
    var redis = new Redis();

    redis.on('error', function (err) {
        console.log('Redis error: ' + err);
        callback(err);
    });

    redis.on('connect', function (err) {
        console.log('Connected to Redis');
        exports.redisConn = redis;
        callback();
    });
}