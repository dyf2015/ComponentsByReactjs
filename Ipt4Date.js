var ColLab = require('../Components/ColLab.js');

var Ipt4Date = React.createClass({
	getInitialState:function() {
	    return {
	   		value:null
	   	}
	},
	componentDidMount:function() {
		$("[data-datepicker]").datepicker();
	},
	change:function(e) {
		this.setState({value:e.target.value})
	},
	render:function() {
		var arr = <input name={this.props.name} onChange={this.change} type="text" className="form-control input-sm" size="16" data-datepicker="" value={this.state.value} data-date-format="yyyy-mm-dd" data-auto-close="true" />;
		if(this.props.haveCol)
			return <ColLab label={this.props.label} >{arr}</ColLab>;
		else
			return arr;
	}
});

module.exports = Ipt4Date;