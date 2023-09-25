const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log('server has been started');
  res.setHeader('Content-Type', 'text/html');
  const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`); // инкапсуляция пути до файла
  let basePath = '';
  switch (req.url) {
    case '/':
    case '/index.html':
    case '/home':
      basePath = createPath('index');
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/contacts');
      res.end();
      break;
    case '/contacts':
      basePath = createPath('contacts');
      break;
    default:
      basePath = createPath('error');
      res.statusCode = 404;
      break;
  }
  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(PORT, 'localhost', (error) => {
  error
    ? console.log('Error', error)
    : console.log('Server is listening on port' + PORT);
});
