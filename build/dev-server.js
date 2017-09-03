require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var bodyParser = require('body-parser')
var multer = require('multer')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

app.post('/api/test',function(req,res){
  console.log(req.body);
  res.json(req.body);
});

app.get('/api/getSpider',function(req,res){
  console.log("获取所有的爬虫信息")

 var data = [{
        id:'1',
        time:'2017/8/25 15:40',
        mainUrl:'baidu.com',
        method:"chrome",
        detailUrl:"test-detailUrl.com",
        dataUrl:["\\test\\","\\test2\\","\\test3\\"],
        attr:[{
          name:"test",
          value:"testValue"
        },{
          name:"test2",
          value:"testValue2"
        },{
          name:"test3",
          value:"testValue3"
        }],
        status:'doing',
        startTime:"2017-8-30T14:12",
        endTime: "2017-8-30T15:12",
        isForce:true,
        selectWorker:3
      },{
        id:'2', 
        time:'2017/8/25 15:40',
        mainUrl:'google.com',
        method:"chrome",
        detailUrl:"test-detailUrl.com",
        dataUrl:["\\test\\"],
        attr:[{
          name:"test",
          value:"testValue"
        }],
        status:'wait'
      },{
        id:'3',
        time:'2017/8/25 15:40',
        mainUrl:'google.com',
        method:"chrome",
        detailUrl:"test-detailUrl.com",
        dataUrl:["\\test\\"],
        attr:[{
          name:"test",
          value:"testValue"
        }],
        status:'success',
        startTime:"2017-8-30T14:12",
        endTime: "2017-8-30T15:12",
        isForce:true,
      }];

      res.send(data);
});

app.get('/api/getDoSpider',function(req,res){
  var getInputData = [{
        'id':1,
        'mainUrl':'baidu.com'
      },{
         'id':2,
        'mainUrl':'taobao.com'
      },{
         'id':3,
        'mainUrl':'tamll.com'
      }]
    res.send(getInputData);
})

app.post('/api/getAllData',function(req,res){
  console.log('请求id'+req.body.id+'的数据');
  var data = [];
  for(var i = 0;i<1000;i++)
  {
        var testid = i;
        var time ="2017-8-14 17:21";
        var name = 'Name'+i;
        var price = '$'+i;
        var content = '这是第'+i+'个简介';
        var mes = {
          "id":testid,
          "time":time,
          "name":name,
          "price":price,
          "content":content
        };
        data.push(mes);
  }
  res.send(data);
});

var getSpiderDataNumber = 0;
app.post('/api/getSpiderData',function(req,res){
  console.log(req.body.id+'getSpiderData');
  var data = {
    'collectUrl':getSpiderDataNumber,
    'anlysisUrl':getSpiderDataNumber,
    'dataNumber':getSpiderDataNumber,
    'attr':[{
          name:"id",
          value:""
        },{
          name:"time",
          value:""
        },{
          name:"name",
          value:""
        },{
          name:"price",
          value:""
        },{
          name:"content",
          value:""
        }]
  };
  getSpiderDataNumber++;
  res.json(data);
});

app.post('/api/login',function(req,res){
  console.log(req.body);  
  if(req.body.name == 'testname' && req.body.password == 'testpassword')
  {
    res.send({'message':'success'});
  }else{
    res.send({'message':'fail'});
  }
});

app.get('/api/getWorker',function(req,res){
  console.log('获取所有的worker信息');

  var workerData = {
          number:5
        };
    res.send(workerData);
});

app.post('/api/getMessageFromId',function(req,res){
  res.send([{
    time:'2017-9-4',
    id:'1',
    message:'test'
  }]);
});

app.post('/api/startSpider',function(req,res){
  console.log(req.body);
  res.send("success");
});

app.post('/api/changeSpiderWorker',function(req,res){
  console.log(req.body);
  res.send({message:"success"});
});

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
