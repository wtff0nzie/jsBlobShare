;(function (win, exportName, undefined) {
    'use strict';

    var store = 'http://blobshare.rocks/',
        blobShare = {};


    // Transport
    var XHR = function (blobName, verb, data, callback) {
        var X = new XMLHttpRequest(),
            promised,
            res,
            err;


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
                    res = X.responseText || '';

                    if (verb === 'GET') {
                        try {
                            res = JSON.parse(res);
                        } catch (e) {
                            err = true;
                            res = e;
                        }
                    }

                    if (X.status < 200 || X.status > 399) {
                        err = true;
                    }

                    if (promised) {
                        (err) ? reject(res, X) : resolve(res, X);
                    } else {
                        resolve(err, res, X);
                    }
                }
            };

            X.send(data);
        };


        if (!callback && win.Promise) {
            promised = true;
            return new Promise(transport);
        }

        transport(callback || function () {});
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