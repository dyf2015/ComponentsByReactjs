var Col = require("./Col.js");

var PanelCell = React.createClass({
	render:function() {
		return <Col xs={12} sm={6} md={4}>{this.props.children}</Col>;
	}
});

module.exports = PanelCell;