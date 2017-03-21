var path=require('path');
var aop = require('node-aop');
var cat=require(path.resolve(__dirname,'./libs/cat.js'));

function catReport(req, res) {
	var tarUrl=req.url.replace(/[\?#].*$/,'')+' ';
	var span=cat.span('URL',tarUrl);
	var isEnd=false;
	function endSpan(){
		if(res.statusCode>=400){
			span.error('http_status_'+res.statusCode,res.statusMessage);
		}
		if (!isEnd){
			isEnd=true;
			span.end();
		}
	}
	req.on('error',function(err){
		span.error(err,'Request Error');
		endSpan();
	});
	res.on('error',function(err){
		span.error(err,'Response Error');
		endSpan();
	});
	res.on('close',endSpan);
	res.on('finish',endSpan);
};

function init(express) {
	aop.before(express, "handle", function(req, res, callback){
	    catReport(req, res);
	    return [req, res, callback];
	});
	return cat;
};


module.exports=init;
