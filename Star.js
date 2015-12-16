var Star = React.createClass({
	render:function() {
		var file = "/cloudStore/images/star/unchoose.png";
		if(this.props.choose) {
			file = "/cloudStore/images/star/choose.png";
		}
		return <img className="star-bottom" onMouseOver={this.props.onMouseOver} onClick={this.props.onClick} src={file} />;
	}
});

module.exports = Star;