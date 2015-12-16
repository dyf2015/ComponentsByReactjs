var Grid = React.createClass({
	shouldComponentUpdate:function(nextProps,nextState) {
		return true;
	},
	render:function() {
		return (
			<div className="container dyfContainer" style={this.props.style}>
			{this.props.children}
			</div>
		)
	}
});

module.exports = Grid;