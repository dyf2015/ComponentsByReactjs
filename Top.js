var Row = require('./Row.js');
var Col = require('./Col.js');

var Top = React.createClass({
	render:function() {
		return (
			<Row otherClass='row-bottom-line' show={0}>
				<Col xs={3} otherClass="hidden-xs">
					<h4>{this.props.title}</h4>
				</Col>
				<Col xs={12} sm={9}>
					<Row>
						<Col xs={12} sm={6} md={4} otherClass="col-sm-offset-6 col-md-offset-8 col-right">
				    	{this.props.children}
						</Col>
					</Row>
				</Col>
			</Row>
		)
	}
});

module.exports = Top;