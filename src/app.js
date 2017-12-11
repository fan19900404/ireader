const config = require('./config');
const http = require("http");
const url = require("url");
const qs = require("querystring");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  const myurl = url.parse(req.url);
  if (myurl.pathname === "/api/catalog") {
    // 转换目录
    const catalogUrl = qs.parse(myurl.query).url;
    const host = url.parse(catalogUrl).host;
    if(config[host]){
      config[host].catalog(catalogUrl,res);
    }else{
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      res.end(`暂时不支持${host}\n`);
    }
  } else if (myurl.pathname === "/api/info") {
    // 转换详情
    const infoUrl = qs.parse(myurl.query).url;
    const host = url.parse(infoUrl).host;
    if(config[host]){
      config[host].info(infoUrl,res);
    }else{
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      res.end(`暂时不支持${host}\n`);
    }
  } else {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
