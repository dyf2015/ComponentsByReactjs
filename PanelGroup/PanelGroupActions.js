var AppDispatcher = require('./PanelGroupDispatcher.js');
var PanelGroupConstants = require('./PanelGroupConstants.js');

var PanelGroupActions = {
	search:function() {
		AppDispatcher.dispatch({
	        actionType:PanelGroupConstants.PANELGROUP_SEARCH,
	    });
	},
	searchByKey:function(key) {
		AppDispatcher.dispatch({
	        actionType:PanelGroupConstants.PANELGROUP_SEARCHBYKEY,
	    	key:key,
	    });
	},
	setOptions:function(options) {
		AppDispatcher.dispatch({
	        actionType:PanelGroupConstants.PANELGROUP_SETOPTIONS,
	    	options:options,
	    });
	}
}

module.exports = PanelGroupActions;