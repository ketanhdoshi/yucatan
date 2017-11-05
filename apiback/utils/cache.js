'use strict';

// Redis library to connect to cache
var Redis = require('redis');

// Redis client connection
var client = null;

// TODO: Change all the async callbacks to use promises. See promises on
// https://www.npmjs.com/package/redis

exports.register = function (server, options, next) {
    client = Redis.createClient(options.port, options.host);

    client.on('connect', () => {
        console.log('Connected to Redis');
    });
    client.on('error', (err) => {
        console.log('Error ' + err);
    });

    // Next must be called at the end of register
    return next();
};

// Plugin registration attributes
exports.register.attributes = {
    name: 'redis-cache'
};

// -----------------------------------------------
// Save String value
// -----------------------------------------------
module.exports.setStr = (key, strVal) => {
    client.set(key, strVal, function(err, reply) {        
        if (err) {
            console.error('error putting key:', err);
            throw err;
        }
        else {
            console.log('Redis saved ' + reply);
        }
    });
}

// -----------------------------------------------
// Get String value
// -----------------------------------------------
module.exports.getStr = (key) => {
    client.get(key, function(err, reply) {
        
        if (err) {
            console.error('error getting key:', err);
            return null;
        }
        else {
            console.log('Redis found key %s, str value = %s', key, reply);
            return reply;
        }        
    });
}

// -----------------------------------------------
// Save Hash value
// -----------------------------------------------
module.exports.setHash = (key, hashVal) => {
    client.hmset(key, hashVal, function(err, reply) {        
        if (err) {
            console.error('error putting key:', err);
            throw err;
        }
        else {
            console.log('Redis saved ', key, hashVal);
        }
    });
}

// -----------------------------------------------
// Get Hash value
// -----------------------------------------------
module.exports.getHash = (key, cb) => {
    client.hgetall(key, function(err, object) {        
        if (err) {
            console.error('error getting key:', err);
            cb (err, null);
        }
        else {
            console.log('Redis found key', key, object);
            cb (null, object);
        }
    });
}

// -----------------------------------------------
// Save List value
// -----------------------------------------------
module.exports.setList = (key, listVal) => {
    // combine key and listVal array into a single array
    let pushArr = [key, ...listVal]; 
    client.rpush(pushArr, function(err, reply) {        
        if (err) {
            console.error('error putting list:', err);
            throw err;
        }
        else {
            console.log('Redis saved ' + reply);
        }
    });
}

// -----------------------------------------------
// Get List value
// -----------------------------------------------
module.exports.getList = (key) => {
    client.lrange(key, 0, -1, function(err, reply) {        
        if (err) {
            console.error('error getting key:', err);
            return null;
        }
        else {
            console.log('Redis found key %s, list value = %s', key, reply);
            return reply;
        }        
    });
}

// -----------------------------------------------
// Save Set value
// -----------------------------------------------
module.exports.setSet = (key, setVal) => {
    // combine key and listVal array into a single array
    let addArr = [key, ...setVal];
    client.sadd(addArr, function(err, reply) {
        if (err) {
            console.error('error putting set:', err);
            throw err;
        }
        else {
            console.log('Redis saved ' + reply);
        }
    });
}

// -----------------------------------------------
// Get Set value
// -----------------------------------------------
module.exports.getSet = (key) => {
    client.smembers(key, function(err, reply) {        
        if (err) {
            console.error('error getting key:', err);
            return null;
        }
        else {
            console.log('Redis found key %s, set value = %s', key, reply);
            return reply;
        }        
    });
}

// -----------------------------------------------
// Does Key exist
// -----------------------------------------------
module.exports.keyExists = (key) => {
    client.exists(key, function(err, reply) {        
        if (err) {
            console.error('error exists:', err);
            throw err;
        }
        else if (reply === 1) {
            console.log('Redis exists key %s', key);
            return true;
        }
        else {
            console.log('Redis does not exist key %s reply %s', key, reply);
        }
    });
}

// -----------------------------------------------
// Delete Key
// -----------------------------------------------
module.exports.delete = (key) => {
    client.del (key, function(err, reply) {        
        if (err) {
            console.error('error delete:', err);
            throw err;
        }
        else if (reply === 1) {
            console.log('Redis key %s deleted %s', key, reply);
            return true;
        }
        else {
            console.log('Redis key not deleted %s', key);
        }
    });
}

// -----------------------------------------------
// Try some operations
// -----------------------------------------------
module.exports.try = () => {
    const host = 'redis-18518.c12.us-east-1-4.ec2.cloud.redislabs.com';
    const port = '18518';
    module.exports.connect (host, port);
    
    const keyStr = 'kStr';
    module.exports.setStr (keyStr, 'angular');
    let val = module.exports.getStr (keyStr);
    
    
    const keyHash = 'kHash';
    const hashVal = {
        javascript: 'AngularJS',
        css: 'Bootstrap',
        node: 'Express'
    };
    module.exports.setHash (keyHash, hashVal);
    val = module.exports.getHash (keyHash);
    console.log ('value is ', val);
        
    const keyList = 'kList';    
    const listVal = ['james', 'bond'];
    module.exports.setList (keyList, listVal);
    val = module.exports.getList(keyList);
    
    const keySet = 'kSet';
    const setVal = ['mintu', 'chintu', 'bantu', 'santa'];
    module.exports.setSet (keySet, setVal);
    val = module.exports.getSet(keySet);
    
    val = module.exports.keyExists(keyHash);
    val = module.exports.keyExists('foo');
    
    module.exports.delete ('foo');
    module.exports.delete (keyList);
     module.exports.delete (keySet);
     
     // TODO - cache expiry
     // Add methods to do more granular operations like get/set individual field
     // in a hash, add/remove individual list items or set items
}


