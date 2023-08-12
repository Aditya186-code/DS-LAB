const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/invoke') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log(body)
            const requestData = JSON.parse(body);
            const methodName = requestData.methodName;
            const params = requestData.params;

            if (methodName === 'add') {
                const result = add(params.a, params.b);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ result }));
            } else {
                res.statusCode = 404;
                res.end('Method not found');
            }
        });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

function add(a, b) {
    return a + b;
}

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
