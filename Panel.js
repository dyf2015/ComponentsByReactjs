var Panel = React.createClass({
	render:function() {
		return (
			<div className="panel panel-default">
			  <div className="panel-heading">
			  	<h4 className="panel-title panel-left">{this.props.title}</h4>
			  </div>
			  <div className="panel-body">
			  	{this.props.children}
			  </div>
			</div>
		)
	}
});

module.exports = Panel;