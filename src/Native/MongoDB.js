
Elm.Native.MongoDB = {};
Elm.Native.MongoDB.make = function(localRuntime) {

    localRuntime.Native = localRuntime.Native || {};
    localRuntime.Native.MongoDB = localRuntime.Native.MongoDB || {};
    if (localRuntime.Native.MongoDB.values) {
        return localRuntime.Native.MongoDB.values;
    }

    var Task = Elm.Native.Task.make(localRuntime);
    var Utils = Elm.Native.Utils.make(localRuntime);

    function connect(opts) {
        var MongoClient;
        return Task.asyncFunction(function(callback) {
            MongoClient = MongoClient || require('mongodb').MongoClient;
            var url = 'mongodb://' + opts.url + ':' + opts.port + '/' + opts.name;
            MongoClient.connect(url, function (err,db) {
                if (err != null) {
                    return callback(Task.fail(err.message));
                }
                console.log("Connected correctly to server");
                return callback(Task.succeed(db));
            });
        });
    }

    function close(db) {
        return Task.asyncFunction(function(callback) {
            console.log("Closing connection");
            db.close(function(err,res) {
                if (err != null) {
                    return callback(Task.fail(err.message));
                }
                console.log("Connection closed");
                return callback(Task.succeed(Utils.Tuple0));
            });
        });
    }

    return localRuntime.Native.MongoDB.values = {
        connect: connect,
        close: close
    };
};

