var http = require('http');
var urllib = require('url');

var port = 8888;

http.createServer(function(req, res) {
    var params = urllib.parse(req.url, true);
    if (params.query && params.query.callback && params.query.url) {
        download(params.query.url, function(fileRes){
            var data = {
                url: params.query.url,
                fileSize: fileRes.headers['content-length']
            };
            res.end(params.query.callback + '(' + JSON.stringify(data) + ')');
        });
    } else {
        res.end(params.query.callback + '(' + JSON.stringify({
            error: 'Invalid params'
        }) + ')');
    }
}).listen(port, function() {
    console.log('server is listening on port ' + port);
});

function download(url, callback) {
    var req = http.get(url, function(res) {
        callback(res);
        req.abort();
    }).on("error", function() {
        callback(null);
    }).on('end', function(){});
}
