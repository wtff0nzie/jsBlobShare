;(function (undefined) {
    var store = 'http://blobshare.rocks/',
        win = window;


    // Transport
    var XHR = function (blobName, verb, data, callback) {
        var X = new XMLHttpRequest();

        X.open(verb, store + blobName, true);

        if (data) {
            X.setRequestHeader('Content-Type', 'application/json');
        }

        X.onload = callback || null;
        X.send(data);
    };


    // Delete a known blob
    var deleteBlob = function (name, callback) {
        XHR(name, 'DELETE', null, function (X) {

            return win.blobShare;
        });
    };


    // Return a blob as a JSON object
    var getBlob = function (name, callback) {
        XHR(name, 'GET', null, function (X) {

        });
    };


    // Update an existing blob (UpSerts)
    var editBlob = function (name, json, callback) {
        XHR(name, 'PATCH', json, function(X) {

            return win.blobShare;
        });
    };


    // Add a new blob
    var putBlob = function (name, json, callback) {
        XHR(name, 'PUT', json, function (X) {

            return win.blobShare;
        });
    };


    //Public API
    window.blobShare = {
        delete  : deleteBlob,
        kill    : deleteBlob,
        get     : getBlob,
        post    : putBlob,
        patch   : edittBlob,
        put     : putBlob,
        set     : putBlob
    };
}());