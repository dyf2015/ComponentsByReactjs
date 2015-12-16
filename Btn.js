var Btn = React.createClass({
	shouldComponentUpdate:function(nextProps,nextState) {
		return false;
	},
	render:function() {
		var theme = 'primary';
		var size = 'sm';
		if(this.props.theme) {
			theme = this.props.theme;
		}
		if(this.props.size) {
			size = this.props.size;
		}
		var className = 'btn btn-'+theme+' btn-'+size;
		if(this.props.otherClass) {
			className += ' '+this.props.otherClass;
		}
		return (
			<button id={this.props.id} onClick={this.props.onClick} type="button" className={className} style={this.props.style}>{this.props.children}</button>
		)
	}
});

module.exports = Btn;