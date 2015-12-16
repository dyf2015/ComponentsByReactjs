var Row = React.createClass({
	shouldComponentUpdate:function(nextProps,nextState) {
		//console.log("this.props.show:"+this.props.show);
		//console.log("nextProps.show:"+nextProps.show);
		//console.log(this.props.show!=nextProps.show);
		if(!this.props.show) return true; //空的时候渲染
		if(this.props.show!=nextProps.show)
			return true;
		return false;
	},
	render:function() {
		var className = 'row';
		if(this.props.otherClass) {
			className += ' '+this.props.otherClass;
		}
		if(this.props.show) {
			if(this.props.show==1)
				className = "hidden";
		}
		return (
			<div className={className} style={this.props.style}>
			{this.props.children}
			</div>
		)
	}
});

module.exports = Row;