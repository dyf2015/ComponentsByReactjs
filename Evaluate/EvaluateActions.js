var AppDispatcher = require('./EvaluateDispatcher.js');
var EvaluateConstants = require('./EvaluateConstants.js');

var EvaluateActions = {
	save:function(sum,arr) {
		AppDispatcher.dispatch({
	        actionType:EvaluateConstants.EVALUATE_SAVE,
	        sum:sum,
	        numArr:arr,
	    });
	},
	search:function() {
		AppDispatcher.dispatch({
	        actionType:EvaluateConstants.EVALUATE_SEARCH,
	    });
	},
	setOptions:function(options) {
		AppDispatcher.dispatch({
	        actionType:EvaluateConstants.EVALUATE_SETOPTIONS,
	    	options:options,
	    });
	}
}

module.exports = EvaluateActions;