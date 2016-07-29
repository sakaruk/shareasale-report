# ShareASale report
ShareASale Performance Marketing Network Reports

	//Loading the modules
	var $shareasaleDetails = {
		token : token,
		api_secret : api_secret,
		affiliateId : affiliate_id
	}
	var ShareASale = require('./lib/shareasale').Affiliate($shareasaleDetails)


    	//Getting the report
	ShareASale.Report({
	    	action : 'activitySummary'
	}, function(err,data) {
		console.log(err,data)
	})
	
# Filters
Check the parameters that can be passed through Report from https://account.shareasale.com/a-apiManager.cfm .  The parameters differ according to the action.
