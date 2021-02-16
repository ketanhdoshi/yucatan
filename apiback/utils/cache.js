'use strict';

// Redis library to connect to cache
var Redis = require('redis');

// Redis client connection
var client = null;

// TODO: Change all the async callbacks to use promises. See promises on
// https://www.npmjs.com/package/redis


exports.plugin = {
    name: "redis-cache",
    version: "1.0.0",
    register: async (server, options) => {
        client = await Redis.createClient(options.port, options.host, {password: options.password});

        client.on('connect', () => {
            console.log('Connected to Redis');
        });
        client.on('error', (err) => {
            console.log('Error ' + err);
        });
    }
}

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
module.exports.getStr = (key, cb) => {
    client.get(key, function(err, strVal) {
        
        if (err) {
            console.error('error getting key:', err);
            cb (err, null);
        }
        else {
            console.log('Redis found key, str value', key, strVal);
            cb (null, strVal);
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
module.exports.getList = (key, cb) => {
    client.lrange(key, 0, -1, function(err, listVal) {        
        if (err) {
            console.error('error getting key:', err);
            cb (err, null);
        }
        else {
            console.log('Redis found key, list value', key, listVal);
            cb (null, listVal);
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
module.exports.getSet = (key, cb) => {
    client.smembers(key, function(err, setVal) {        
        if (err) {
            console.error('error getting key:', err);
            cb (err, null);
        }
        else {
            console.log('Redis found key, set value', key, setVal);
            cb (null, setVal);
        }        
    });
}

// -----------------------------------------------
// Does Key exist
// -----------------------------------------------
module.exports.keyExists = (key, cb) => {
    client.exists(key, function(err, reply) {        
        if (err) {
            console.error('error exists:', err);
            cb (err, null);
        }
        else if (reply === 1) {
            console.log('Redis exists key %s', key);
            cb (null, true);
        }
        else {
            console.log('Redis does not exist key, reply', key, reply);
            cb (null, false);
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
    const keyStr = 'kStr';
    module.exports.setStr (keyStr, 'angular');
    module.exports.getStr (keyStr, 
        (err, strVal) => {
            if (!err) console.log ('try strVal ', strVal);
        }
    );
    
    
    const keyHash = 'kHash';
    const hashVal = {
        javascript: 'AngularJS',
        css: 'Bootstrap',
        node: 'Express'
    };
    module.exports.setHash (keyHash, hashVal);
    module.exports.getHash (keyHash,
        (err, hashVal) => {
            if (!err) console.log ('try hashVal ', hashVal);
        }
    );
        
    const keyList = 'kList';    
    const listVal = ['james', 'bond'];
    module.exports.setList (keyList, listVal);
    module.exports.getList(keyList,
        (err, listVal) => {
            if (!err) console.log ('try listVal ', listVal);
        }
    );
    
    const keySet = 'kSet';
    const setVal = ['mintu', 'chintu', 'bantu', 'santa'];
    module.exports.setSet (keySet, setVal);
    module.exports.getSet(keySet, 
        (err, setVal) => {
            if (!err) console.log ('try setVal ', setVal);
        }
    );
    
    module.exports.keyExists(keyHash, 
        (err, exists) => {
            if (!err) console.log ('try exists ', keyHash, exists);
        }
    );
    module.exports.keyExists('foo',
        (err, exists) => {
            if (!err) console.log ('try exists foo ', exists);
        }
    );
    
    module.exports.delete ('foo');
    module.exports.delete (keyList);
     module.exports.delete (keySet);
     
     // TODO - cache expiry
     // Add methods to do more granular operations like get/set individual field
     // in a hash, add/remove individual list items or set items
}


