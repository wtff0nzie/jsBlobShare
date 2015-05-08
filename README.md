# BlobShare JS widget
Client-side interface for http://blobShare.rocks.

## Features
* Simple interface
* Support callbacks and promises
* Chainable
* Works well with others (AMD, require)

## Usage
    <script src="blobShare.js"></script>
    <script>
        var obj = {
            test: 'thingy'
        };

        blobShare
            .get('test-obj', function (err, data, XHRObject) {
                if (err) {
                    alert('An error occurred: ' + data);
                    return;
                }

                console.log(data);
            })
            .update('text-obj', obj)
            .delete('text-obj');
    </script>

## Methods
* get
* delete (aliased as drop and kill)
* save (aliased as put, patch, post, update, set)