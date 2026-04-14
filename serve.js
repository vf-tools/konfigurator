const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const MIME = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer((req, res) => {
  let fp = path.join(dir, req.url === '/' ? 'Vanfabrik.html' : decodeURIComponent(req.url));
  fs.readFile(fp, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(fp).toLowerCase();
    res.writeHead(200, {'Content-Type': (MIME[ext] || 'application/octet-stream') + '; charset=utf-8'});
    res.end(data);
  });
}).listen(3456, () => console.log('Server running on port 3456'));
