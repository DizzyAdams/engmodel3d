import http from 'node:http';

function probe(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: '127.0.0.1', port: 3000, method: 'GET', path }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf8');
        resolve({ status: res.statusCode, body });
      });
    });
    req.on('error', reject);
    req.setTimeout(4000, () => { req.destroy(); reject(new Error('timeout')); });
    req.end();
  });
}

(async () => {
  const paths = ['/', '/catalog', '/catalog/casa-contemporanea-listing', '/catalog/loja-comercial-shell', '/projects/casa-contemporanea'];
  for (const path of paths) {
    try {
      const result = await probe(path);
      console.log(path, result.status, result.body.slice(0, 200).replace(/\n/g, ' '));
    } catch (e) {
      console.log(path, 'ERR', e.message);
    }
  }
})();
