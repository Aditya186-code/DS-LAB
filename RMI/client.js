const http = require('http');

const requestData = JSON.stringify({
    methodName: 'add',
    params: { a: 5, b: 3 }
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/invoke',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': requestData.length
    }
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const response = JSON.parse(data);
        console.log('Result:', response.result);
    });
});

req.on('error', (error) => {
    console.error('Error:', error.message);
});

req.write(requestData);
req.end();
