var ColLab = require("./ColLab.js");

var Ipt = React.createClass({
	render:function() {
		var size = 'sm';
		if(this.props.size) {
			size = this.props.size;
		}
		var className = 'form-control input-'+size;
		if(this.props.otherClass) {
			className += ' '+this.props.otherClass;
		}
		var arr = <input onClick={this.props.onClick} onChange={this.props.onChange} onInput={this.props.onInput} name={this.props.name} type={this.props.type} style={this.props.style} className={className} value={this.props.value}  />;
		if(this.props.haveCol)
			return <ColLab label={this.props.label} >{arr}</ColLab>;
		else
			return arr;
	}
});

module.exports = Ipt;