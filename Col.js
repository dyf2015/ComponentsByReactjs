var Col = React.createClass({
	shouldComponentUpdate:function(nextProps,nextState) {
		return true;
	},
	render:function() {
		var className = '';
		if(this.props.xs) {
			className += ' col-xs-'+this.props.xs;
		}
		if(this.props.sm) {
			className += ' col-sm-'+this.props.sm;
		}
		if(this.props.md) {
			className += ' col-md-'+this.props.md;
		}
		if(this.props.lg) {
			className += ' col-lg-'+this.props.lg;
		}
		if(className=='') {
			className += ' col-xs-12';
		}
		if(this.props.otherClass) {
			className += ' '+this.props.otherClass;
		}
		return (
			<div className={className} style={this.props.style}>{this.props.children}</div>
		)
	}
});

module.exports = Col;