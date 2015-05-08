;(function (win, exportName, undefined) {
    var store = 'http://blobshare.rocks/',
        blobShare = {};

    store = 'http://localhost:8081/';


    // Check if useragent supports us
    if (!win.Promise || !win.JSON) {
        return;
    }


    // Transport
    var XHR = function (blobName, verb, data, callback) {
        var X = new XMLHttpRequest(),
            promised = false,
            err = null,
            response,
            status;


        var transport = function (resolve, reject) {
            X.open(verb, store + blobName, true);

            if (data) {
                X.setRequestHeader('Content-Type', 'application/json');

                if (typeof data !== 'string') {
                    data = JSON.stringify(data);
                }
            }

            X.onreadystatechange = function () {
                if (X.readyState === 4) {
                    response = X.responseText;
                    status = X.status;

                    if (verb === 'GET') {
                        try {
                            response = JSON.parse(response);
                        } catch (e) {
                            err = true;
                            response = e;
                        }
                    }

                    if (status < 200 || status > 399) {
                        err = true;
                    }

                    if (promised) {
                        return (err) ? reject(response, X) : resolve(response, X);
                    } else {
                        return (err) ? reject(err, response, X) : resolve(err, response, X);
                    }
                }
            };

            X.send(data);
        };


        if (!callback && win.Promise) {
            promised = true;
            return new Promise(transport);
        }

        if (!callback) {
            callback = function () {};
        }

        transport(callback, callback);
        return blobShare;
    };


    // Delete a known blob
    var deleteBlob = function (name, callback) {
        return XHR(name, 'DELETE', null, callback);
    };


    // Return a blob as a JSON object
    var getBlob = function (name, callback) {
        return XHR(name, 'GET', null, callback);
    };


    // Update an existing blob (UpSerts)
    var editBlob = function (name, json, callback) {
        return XHR(name, 'PATCH', json, callback);
    };


    // Add a new blob
    var putBlob = function (name, json, callback) {
        return XHR(name, 'PUT', json, callback);
    };


    // Build public API
    blobShare = {
        del     : deleteBlob,
        delete  : deleteBlob,
        insert  : putBlob,
        kill    : deleteBlob,
        get     : getBlob,
        update  : putBlob,
        post    : putBlob,
        patch   : editBlob,
        put     : putBlob,
        set     : putBlob
    };


    // Share public API
    if (typeof define == 'function' && define.amd) {
        define(function() {
            return blobShare;
        });
    } else if (typeof module != 'undefined' && module.exports) {
        module.exports = blobShare;
    } else {
        win[exportName] = blobShare;
    }
}(window, 'blobShare'));