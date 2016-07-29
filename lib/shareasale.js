var request = require('request')
var xmlParser = require('xml2json')
var crypto = require('crypto')

Affiliate = function($details) {
	this.details = $details
}
Affiliate.prototype.Report = function($params, cb ) {
    	$params.token = this.details.token
	$params.version = '2.1'
	$params.XMLFormat = 1
	$params.affiliateId = typeof $params.affiliateId === 'undefined' ? this.details.affiliateId : $params.affiliateId

	var today = new Date()
	var formattedDate = today.toUTCString()
	var beforeSHA = this.details.token+":"+formattedDate+":"+$params.action+":"+this.details.api_secret

	var shaHex = crypto.createHash('sha256').update(beforeSHA).digest('hex')
	var $headers = {
		"x-ShareASale-Date": formattedDate,
		"x-ShareASale-Authentication": shaHex
	}
	
	request({
		method: 'GET',
		url: "https://api.shareasale.com/x.cfm",
		qs: $params,
		headers: $headers
	},function(err,res,body) {
		if (err)
			return cb(err)
  		
		if(body.indexOf('</') == -1){
			return cb({errorMessage: body})
		}
		
		var data = xmlParser.toJson( body)

		if (!data.length){
			return cb({errorMessage: 'empty XML'})
		}

		cb(null,JSON.parse(data))
	})
}
module.exports =  {
	Affiliate: function($details) {
		return new Affiliate($details)
	}
}

