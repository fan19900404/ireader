const charset = require("superagent-charset");
const request = require("superagent");
const cheerio = require("cheerio");
charset(request);

module.exports = {
  "www.23xs.cc": {
    charset: "gbk",
    catalog(url,res){
      request
      .get(url)
      .charset("gbk")
      .end((err, request) => {
        const body = request.text;
        const $ = cheerio.load(body);
        const table = $("table a");
        const json = [];
        table.each(function(index,val){
          json.push({
            url:'http://www.23xs.cc/'+$(val).attr('href'),
            title:$(val).text()
          })
        })
        console.log(json)
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/json;charset=utf-8");
        res.end(`${JSON.stringify(json)}\n`);
      });
    }
  }
};
