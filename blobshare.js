;(function (win, undefined) {
    var store = 'http://blobshare.rocks/';


    // Transport
    var XHR = function (blobName, verb, data, callback) {
        var X = new XMLHttpRequest(),
            response,
            status;

        if (!callback) {
            return win.blobShare;
        }

        X.open(verb, store + blobName, true);

        if (data) {
            X.setRequestHeader('Content-Type', 'application/json');
        }

        X.onload = function () {
            if (X.readyState === 4) {
                response = X.responseText;
                status = X.status;

                if (s < 200 || s > 299) {
                    return callback(true, r, X);
                }

                return callback(null, r, X);
            }
        };

        X.send(data);
    };


    // Delete a known blob
    var deleteBlob = function (name, callback) {
        XHR(name, 'DELETE', null, callback);
        return win.blobShare;
    };


    // Return a blob as a JSON object
    var getBlob = function (name, callback) {
        XHR(name, 'GET', null, function (err, r, X) {
            callback(JSON.parse(null, r, X));
        });
        
        return win.blobShare;
    };


    // Update an existing blob (UpSerts)
    var editBlob = function (name, json, callback) {
        XHR(name, 'PATCH', json, callback);
        return win.blobShare;
    };


    // Add a new blob
    var putBlob = function (name, json, callback) {
        XHR(name, 'PUT', json, callback);
        return win.blobShare;
    };


    //Public API
    win.blobShare = {
        delete  : deleteBlob,
        insert  : putBlob,
        kill    : deleteBlob,
        get     : getBlob,
        update  : putBlob,
        post    : putBlob,
        patch   : edittBlob,
        put     : putBlob,
        set     : putBlob
    };
}(window));
