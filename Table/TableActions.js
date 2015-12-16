var AppDispatcher = require('./TableDispatcher.js');
var TableConstants = require('./TableConstants.js');

var TableActions = {
	search:function() {
		AppDispatcher.dispatch({
	        actionType:TableConstants.TABLE_SEARCH
	    });
	},
	goPage:function(newPage) {
		AppDispatcher.dispatch({
	        actionType:TableConstants.TABLE_GOPAGE,
	    	newPage:newPage
	    });
	},
	searchByKey:function(key) {
		AppDispatcher.dispatch({
	        actionType:TableConstants.TABLE_SEARCHBYKEY,
	    	key:key
	    });
	},
	setOptions:function(options) {
		AppDispatcher.dispatch({
	        actionType:TableConstants.TABLE_SETOPTIONS,
	    	options:options
	    });
	}
}

module.exports = TableActions;