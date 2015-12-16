var Col = require("./Col.js");

var ColLab = React.createClass({
	render:function() {	
		return <Col xs={6} sm={4} md={3}><label>{this.props.label}</label>{this.props.children}</Col>;
	}
});

module.exports = ColLab;