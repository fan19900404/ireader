const charset = require("superagent-charset");
const request = require("superagent");
const cheerio = require("cheerio");
charset(request);

module.exports = {
  "www.23xs.cc": {
    charset: "gbk",
    catalog(url, res) {
      request
        .get(url)
        .charset("gbk")
        .end((err, request) => {
          const body = request.text;
          const $ = cheerio.load(body);
          const book = $('dd h1').text().replace('章节目录','');
          const author = $('dd h3').text().replace('作者：','')
          const table = $("table a");
          const json = [];
          table.each(function(index, val) {
            json.push({
              url: url.replace('index.html',$(val).attr("href")),
              title: $(val).text()
            });
          });
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/json;charset=utf-8");
          res.end(`${JSON.stringify({book,author,catalog:json})}\n`);
        });
    },
    info(url, res) {
      request
        .get(url)
        .charset("gbk")
        .end((err, request) => {
          const body = request.text;
          const $ = cheerio.load(body, { decodeEntities: false });
          const title = $("#amain h1").text();
          const content = $("#contents").html()
            .split("<br>")
            .filter((v, i) => {
              if (v && i) {
                return true;
              }
              return false;
            })
            .join("\n")
            .split("\n")
            .filter(v => !!v)
            .map(v => v.trim());
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/json;charset=utf-8");
          res.end(`${JSON.stringify({ title, content })}\n`);
        });
    }
  }
};
