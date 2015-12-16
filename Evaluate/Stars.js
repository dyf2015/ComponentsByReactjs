var Star = require('../Star.js');

var Stars = React.createClass({
	getInitialState:function() {
		return {
			num:this.props.num,
		}
	},
	render:function() {
		//console.log(this.props.num);
		var starArr = new Array();
		for(var i=0;i<5;i++) {
			if(this.props.opType=="edit")
				starArr[i] = <Star onClick={this.changeStar.bind(this,i+1)} choose={this.state.num>=(i+1)} />
			else
				starArr[i] = <Star choose={this.state.num>=(i+1)} />
		}
		return <div className="eval-div">
			   <span className="eval-title-span">
			   {this.props.title}
			   &nbsp;&nbsp;
			   </span>
			   <span className="eval-img-span">{starArr}</span>
			   </div>;
	},
	changeStar:function(num) {
		//console.log(" num:"+num);
		this.props.setNum(num);
		this.setState({
			num:num
		});
	}
});

module.exports = Stars;